"""
The Bin: deleted records are kept for BIN_DAYS days, then removed for good.

move_to_bin(obj)    saves a copy of obj and everything its delete cascades to,
                    then deletes them.
soft_bin(customer)  records a customer that was only marked "Deleted".
restore(item)       puts the rows back (or the old status) and drops the item.
purge(item)         deletes for good.
purge_expired()     purges every item older than BIN_DAYS.
"""
import json
from datetime import timedelta

from django.apps import apps
from django.contrib.admin.utils import NestedObjects
from django.core import serializers
from django.db import transaction
from django.utils import timezone

from .models import BinItem

BIN_DAYS = 30


def _label(obj):
    return obj._meta.label_lower


def _type(obj):
    return obj._meta.verbose_name.title()


def _name(obj):
    for attr in ('name', 'class_name', 'invoice_no', 'order_no', 'transaction_no', 'truck_no', 'code'):
        val = getattr(obj, attr, None)
        if val:
            return str(val)[:255]
    return str(obj)[:255]


@transaction.atomic
def move_to_bin(obj):
    collector = NestedObjects(using='default')
    collector.collect([obj])
    rows = [o for objs in collector.data.values() for o in objs]

    # Links that the delete will clear (on_delete=SET_NULL), so restore can
    # point them back at the restored rows.
    set_null = []
    for (field, _value), groups in collector.field_updates.items():
        for group in groups:
            for inst in group:
                set_null.append({
                    'model': _label(inst),
                    'pk': inst.pk,
                    'field': field.attname,
                    'value': getattr(inst, field.attname),
                })

    item = BinItem.objects.create(
        kind='hard',
        model_label=_label(obj),
        object_pk=str(obj.pk),
        item_type=_type(obj),
        name=_name(obj),
        data=json.loads(serializers.serialize('json', rows)),
        set_null=set_null,
        related_count=len(rows) - 1,
    )
    obj.delete()
    return item


def soft_bin(customer, previous_status):
    BinItem.objects.filter(kind='soft', model_label=_label(customer), object_pk=str(customer.pk)).delete()
    return BinItem.objects.create(
        kind='soft',
        model_label=_label(customer),
        object_pk=str(customer.pk),
        item_type=_type(customer),
        name=_name(customer),
        previous_status=previous_status or 'Active',
    )


class RestoreError(Exception):
    pass


@transaction.atomic
def restore(item):
    if item.kind == 'soft':
        model = apps.get_model(item.model_label)
        model.objects.filter(pk=item.object_pk).update(status=item.previous_status or 'Active')
        item.delete()
        return
    try:
        # Postgres checks foreign keys at commit, so row order doesn't matter here.
        for row in serializers.deserialize('json', json.dumps(item.data)):
            row.save()
        for link in item.set_null:
            model = apps.get_model(link['model'])
            model.objects.filter(pk=link['pk'], **{link['field']: None}).update(**{link['field']: link['value']})
    except Exception as exc:  # unique code taken again, a parent row gone, ...
        transaction.set_rollback(True)
        raise RestoreError(str(exc)) from exc
    item.delete()


@transaction.atomic
def purge(item):
    if item.kind == 'soft':
        model = apps.get_model(item.model_label)
        model.objects.filter(pk=item.object_pk, status='Deleted').delete()
    item.delete()


def drop_stale_soft_items():
    """Customers restored on the Customers page leave the Bin by themselves."""
    for item in BinItem.objects.filter(kind='soft'):
        model = apps.get_model(item.model_label)
        if not model.objects.filter(pk=item.object_pk, status='Deleted').exists():
            item.delete()


def purge_expired():
    cutoff = timezone.now() - timedelta(days=BIN_DAYS)
    count = 0
    for item in BinItem.objects.filter(deleted_at__lt=cutoff):
        purge(item)
        count += 1
    return count


class BinDestroyMixin:
    """For ModelViewSets: DELETE moves the record to the Bin instead of erasing it."""

    def perform_destroy(self, instance):
        move_to_bin(instance)
