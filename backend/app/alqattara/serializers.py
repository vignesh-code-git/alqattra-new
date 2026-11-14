import math
from datetime import timedelta

from django.utils import timezone
from rest_framework import serializers
from .models import (
    Product, StoreInventory, Order, OrderItem,
    Invoice, CashierTransaction, Wallet, WalletRecharge,
    Zone, Route, MasterItem, StaffUser, AccessLevel, BinItem
)

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class StoreInventorySerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')
    product_code = serializers.ReadOnlyField(source='product.code')

    class Meta:
        model = StoreInventory
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')

    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    customer_name = serializers.ReadOnlyField(source='customer.name')
    customer_code = serializers.ReadOnlyField(source='customer.customer_code')
    salesman_name = serializers.ReadOnlyField(source='salesman.name')
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

class InvoiceSerializer(serializers.ModelSerializer):
    customer_name = serializers.ReadOnlyField(source='customer.name')
    customer_code = serializers.ReadOnlyField(source='customer.customer_code')

    class Meta:
        model = Invoice
        fields = '__all__'

class CashierTransactionSerializer(serializers.ModelSerializer):
    customer_name = serializers.ReadOnlyField(source='customer.name')
    salesman_name = serializers.ReadOnlyField(source='salesman.name')

    class Meta:
        model = CashierTransaction
        fields = '__all__'

class WalletRechargeSerializer(serializers.ModelSerializer):
    customer = serializers.ReadOnlyField(source='wallet.customer_id')
    customer_name = serializers.ReadOnlyField(source='wallet.customer.name')
    customer_code = serializers.ReadOnlyField(source='wallet.customer.customer_code')

    class Meta:
        model = WalletRecharge
        fields = '__all__'

    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError('Recharge amount must be greater than zero.')
        return value

class WalletSerializer(serializers.ModelSerializer):
    customer_name = serializers.ReadOnlyField(source='customer.name')
    customer_code = serializers.ReadOnlyField(source='customer.customer_code')
    recharges = WalletRechargeSerializer(many=True, read_only=True)

    class Meta:
        model = Wallet
        fields = '__all__'

class ZoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Zone
        fields = '__all__'

class RouteSerializer(serializers.ModelSerializer):
    zone_name = serializers.ReadOnlyField(source='zone.name')
    salesman_name = serializers.ReadOnlyField(source='driver_salesman.name')

    class Meta:
        model = Route
        fields = '__all__'

class MasterItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MasterItem
        fields = '__all__'


class StaffUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffUser
        fields = '__all__'


class AccessLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccessLevel
        fields = '__all__'


class BinItemSerializer(serializers.ModelSerializer):
    expires_at = serializers.SerializerMethodField()
    days_left = serializers.SerializerMethodField()

    class Meta:
        model = BinItem
        fields = ['id', 'kind', 'model_label', 'object_pk', 'item_type', 'name',
                  'related_count', 'deleted_at', 'expires_at', 'days_left']

    def _expires(self, obj):
        from .bin import BIN_DAYS
        return obj.deleted_at + timedelta(days=BIN_DAYS)

    def get_expires_at(self, obj):
        return self._expires(obj)

    def get_days_left(self, obj):
        secs = (self._expires(obj) - timezone.now()).total_seconds()
        return max(0, math.ceil(secs / 86400))
