from django.db import models
from app.customers.models import Customer
from app.salesman.models import Salesman

class Product(models.Model):
    CATEGORIES = [
        ('Water 5 Gallon', 'Water 5 Gallon'),
        ('Bottled Water (PET)', 'Bottled Water (PET)'),
        ('Accessories & Coolers', 'Accessories & Coolers'),
        ('Dispensers', 'Dispensers'),
    ]

    code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100, choices=CATEGORIES, default='Water 5 Gallon')
    unit = models.CharField(max_length=50, default='Bottle')
    cost_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    selling_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    stock_quantity = models.IntegerField(default=0)
    min_stock = models.IntegerField(default=10)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.code} - {self.name}"


class StoreInventory(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='inventory_records')
    batch_no = models.CharField(max_length=100, blank=True, null=True)
    quantity_in = models.IntegerField(default=0)
    quantity_out = models.IntegerField(default=0)
    balance = models.IntegerField(default=0)
    location = models.CharField(max_length=100, default='Main Warehouse - Al Ain')
    remarks = models.TextField(blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return f"{self.product.name} (Balance: {self.balance})"


class Order(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Confirmed', 'Confirmed'),
        ('Out For Delivery', 'Out For Delivery'),
        ('Delivered', 'Delivered'),
        ('Cancelled', 'Cancelled'),
    ]

    PAYMENT_METHODS = [
        ('Cash', 'Cash'),
        ('Card', 'Card'),
        ('Wallet', 'Wallet'),
        ('Credit', 'Credit'),
    ]

    order_no = models.CharField(max_length=50, unique=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='orders')
    salesman = models.ForeignKey(Salesman, on_delete=models.SET_NULL, null=True, blank=True, related_name='orders')
    order_date = models.DateField(auto_now_add=True)
    delivery_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='Pending')
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHODS, default='Cash')
    payment_status = models.CharField(max_length=20, default='Unpaid', choices=[('Unpaid', 'Unpaid'), ('Paid', 'Paid'), ('Partial', 'Partial')])
    route = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=50, default='AL AIN')
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.order_no} - {self.customer.name} (AED {self.total_amount})"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    total_price = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return f"{self.product.name} x {self.quantity}"


class Invoice(models.Model):
    STATUS_CHOICES = [
        ('Draft', 'Draft'),
        ('Sent', 'Sent'),
        ('Paid', 'Paid'),
        ('Partial', 'Partial'),
        ('Overdue', 'Overdue'),
    ]

    invoice_no = models.CharField(max_length=50, unique=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True, blank=True, related_name='invoices')
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='invoices')
    invoice_date = models.DateField(auto_now_add=True)
    due_date = models.DateField()
    subtotal = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    tax_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.00) # 5% VAT in UAE
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    paid_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Draft')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-invoice_date']

    def __str__(self):
        return f"{self.invoice_no} ({self.customer.name})"


class CashierTransaction(models.Model):
    PAYMENT_TYPES = [
        ('Collection', 'Collection'),
        ('Credit Payment', 'Credit Payment'),
        ('Wallet Recharge', 'Wallet Recharge'),
        ('Refund', 'Refund'),
    ]

    PAYMENT_METHODS = [
        ('Cash', 'Cash'),
        ('Card', 'Card'),
        ('Wallet', 'Wallet'),
        ('Cheque', 'Cheque'),
        ('Bank Transfer', 'Bank Transfer'),
    ]

    transaction_no = models.CharField(max_length=50, unique=True)
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True, related_name='cashier_transactions')
    salesman = models.ForeignKey(Salesman, on_delete=models.SET_NULL, null=True, blank=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    payment_type = models.CharField(max_length=30, choices=PAYMENT_TYPES, default='Collection')
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHODS, default='Cash')
    reference_note = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.transaction_no} - AED {self.amount} ({self.payment_method})"


class Wallet(models.Model):
    customer = models.OneToOneField(Customer, on_delete=models.CASCADE, related_name='wallet')
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    reward_points = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.customer.name} Wallet - AED {self.balance}"


class WalletRecharge(models.Model):
    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE, related_name='recharges')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    bonus = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    payment_method = models.CharField(max_length=20, default='Card')
    transaction_ref = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Recharge AED {self.amount} - {self.wallet.customer.name}"


class Zone(models.Model):
    CITIES = [
        ('AL AIN', 'AL AIN'),
        ('ABU DHABI', 'ABU DHABI'),
        ('DUBAI', 'DUBAI'),
    ]

    code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=50, choices=CITIES, default='AL AIN')
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} ({self.city})"


class Route(models.Model):
    code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    zone = models.ForeignKey(Zone, on_delete=models.CASCADE, related_name='routes')
    driver_salesman = models.ForeignKey(Salesman, on_delete=models.SET_NULL, null=True, blank=True, related_name='routes')
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} - {self.zone.name}"


class MasterItem(models.Model):
    category = models.CharField(max_length=100) # e.g. 'Customer Category', 'Payment Term', 'Bottle Size', 'Expense Type'
    code = models.CharField(max_length=50)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"[{self.category}] {self.name}"


class StaffUser(models.Model):
    """A CRM login user, as listed on the Masters page."""
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    role = models.CharField(max_length=100, blank=True, default='')
    phone = models.CharField(max_length=50, blank=True, default='')
    registered_on = models.CharField(max_length=50, blank=True, default='')
    last_login = models.CharField(max_length=50, blank=True, default='-')
    last_logout = models.CharField(max_length=50, blank=True, default='-')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return f"{self.name} <{self.email}>"


class AccessLevel(models.Model):
    """A user class and the modules it can read or edit (Privileges page)."""
    class_name = models.CharField(max_length=100)
    readonly = models.TextField(blank=True, default='')
    read_write = models.TextField(blank=True, default='')
    registered_on = models.CharField(max_length=50, blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.class_name


class BinItem(models.Model):
    """
    A deleted record waiting in the Bin.

    Deleting through the API saves a JSON copy of the record (and every row
    its delete cascades to) here before removing it, so it can be restored.
    Items older than BIN_DAYS are deleted for good (see app/alqattara/bin.py).

    kind 'hard': the rows are already gone from their tables; restore re-creates them.
    kind 'soft': the record still exists, only marked deleted (customers);
                 restore puts the old status back, purge deletes it for real.
    """
    KINDS = [('hard', 'Deleted'), ('soft', 'Marked deleted')]

    kind = models.CharField(max_length=10, choices=KINDS, default='hard')
    model_label = models.CharField(max_length=100)      # e.g. "salesman.truck"
    object_pk = models.CharField(max_length=64)
    item_type = models.CharField(max_length=100)        # e.g. "Truck"
    name = models.CharField(max_length=255)
    data = models.JSONField(default=list)               # serialized rows
    set_null = models.JSONField(default=list)           # links cleared by the delete
    previous_status = models.CharField(max_length=50, blank=True, default='')
    related_count = models.IntegerField(default=0)      # cascaded rows saved with it
    deleted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-deleted_at']

    def __str__(self):
        return f"{self.item_type}: {self.name}"
