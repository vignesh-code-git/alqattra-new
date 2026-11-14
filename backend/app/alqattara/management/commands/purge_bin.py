from django.core.management.base import BaseCommand

from app.alqattara.bin import purge_expired, BIN_DAYS


class Command(BaseCommand):
    help = f"Permanently delete Bin items older than {BIN_DAYS} days."

    def handle(self, *args, **options):
        n = purge_expired()
        self.stdout.write(f"Purged {n} item(s) from the Bin.")
