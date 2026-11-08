from django.db import models

class Customer(models.Model):
    CUSTOMER_TYPES = [
        ('Individual', 'Individual'),
        ('Corporate', 'Corporate'),
        ('Government', 'Government'),
    ]

    CITIES = [
        ('AL AIN', 'AL AIN'),
        ('ABU DHABI', 'ABU DHABI'),
        ('DUBAI', 'DUBAI'),
    ]

    STATUS_CHOICES = [
        ('Active', 'Active'),
        ('Inactive', 'Inactive'),
        ('Deleted', 'Deleted'),
    ]

    customer_code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=255)
    customer_type = models.CharField(max_length=50, choices=CUSTOMER_TYPES, default='Individual')
    phone = models.CharField(max_length=50)
    email = models.EmailField(blank=True, null=True)
    city = models.CharField(max_length=50, choices=CITIES, default='AL AIN')
    zone = models.CharField(max_length=100, blank=True, null=True)
    route = models.CharField(max_length=100, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    credit_limit = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    current_balance = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Active')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.customer_code} - {self.name}"


class CustomerStatement(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='statements')
    date = models.DateField(auto_now_add=True)
    description = models.CharField(max_length=255)
    reference_no = models.CharField(max_length=100, blank=True, null=True)
    debit = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    credit = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)

    class Meta:
        ordering = ['-date', '-id']

    def __str__(self):
        return f"{self.customer.customer_code} - {self.description} ({self.date})"
