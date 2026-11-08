from django.db import models

class Salesman(models.Model):
    CITIES = [
        ('AL AIN', 'AL AIN'),
        ('ABU DHABI', 'ABU DHABI'),
        ('DUBAI', 'DUBAI'),
    ]

    salesman_code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=255)
    mobile = models.CharField(max_length=50)
    email = models.EmailField(blank=True, null=True)
    city = models.CharField(max_length=50, choices=CITIES, default='AL AIN')
    assigned_route = models.CharField(max_length=100, blank=True, null=True)
    commission_rate = models.DecimalField(max_digits=5, decimal_places=2, default=5.00)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f"{self.salesman_code} - {self.name}"


class Truck(models.Model):
    STATUS_CHOICES = [
        ('Active', 'Active'),
        ('Maintenance', 'Maintenance'),
        ('Idle', 'Idle'),
    ]

    plate_no = models.CharField(max_length=50, unique=True)
    truck_name = models.CharField(max_length=100)
    model = models.CharField(max_length=100, blank=True, null=True)
    capacity_5gal = models.IntegerField(default=250)
    driver_salesman = models.ForeignKey(Salesman, on_delete=models.SET_NULL, null=True, blank=True, related_name='trucks')
    route = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='Active')
    last_service_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.plate_no} ({self.truck_name})"


class TruckStockTransaction(models.Model):
    TRANSACTION_TYPES = [
        ('Load', 'Load'),
        ('Unload', 'Unload'),
        ('Return', 'Return'),
    ]

    truck = models.ForeignKey(Truck, on_delete=models.CASCADE, related_name='stock_transactions')
    transaction_type = models.CharField(max_length=30, choices=TRANSACTION_TYPES)
    product_name = models.CharField(max_length=150)
    quantity = models.IntegerField()
    transferred_by = models.CharField(max_length=150, default='Store Keeper')
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.transaction_type} - {self.product_name} x {self.quantity} to {self.truck.plate_no}"


class CommissionReport(models.Model):
    salesman = models.ForeignKey(Salesman, on_delete=models.CASCADE, related_name='commissions')
    period = models.CharField(max_length=50)
    total_sales = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    commission_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    status = models.CharField(max_length=30, default='Approved')

    def __str__(self):
        return f"{self.salesman.name} - {self.period}: AED {self.commission_amount}"
