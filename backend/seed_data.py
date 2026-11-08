import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.development')
django.setup()

from django.contrib.auth.models import User
from app.customers.models import Customer, CustomerStatement
from app.salesman.models import Salesman, Truck, TruckStockTransaction
from app.alqattara.models import (
    Product, StoreInventory, Order, OrderItem,
    Invoice, CashierTransaction, Wallet, WalletRecharge,
    Zone, Route, MasterItem
)
from datetime import date, timedelta
from decimal import Decimal

def seed():
    print("Seeding Al Qattara CRM initial data...")

    # 1. Admin Superuser
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@alqattara.ae', 'admin123')
        print("Created superuser: admin / admin123")

    # 2. Zones & Routes
    z_alain, _ = Zone.objects.get_or_create(code='ZN-AA-01', defaults={'name': 'Al Ain Central', 'city': 'AL AIN'})
    z_abudhabi, _ = Zone.objects.get_or_create(code='ZN-AD-01', defaults={'name': 'Abu Dhabi Corniche', 'city': 'ABU DHABI'})
    z_dubai, _ = Zone.objects.get_or_create(code='ZN-DXB-01', defaults={'name': 'Dubai Downtown', 'city': 'DUBAI'})

    # 3. Salesmen
    s1, _ = Salesman.objects.get_or_create(
        salesman_code='SM-101',
        defaults={
            'name': 'Mohammed Rashid',
            'mobile': '+971 50 123 4567',
            'email': 'rashid@alqattara.ae',
            'city': 'AL AIN',
            'assigned_route': 'Route AA-01',
            'commission_rate': Decimal('5.00')
        }
    )
    s2, _ = Salesman.objects.get_or_create(
        salesman_code='SM-102',
        defaults={
            'name': 'Ahmed Al Mansoori',
            'mobile': '+971 55 987 6543',
            'email': 'ahmed@alqattara.ae',
            'city': 'ABU DHABI',
            'assigned_route': 'Route AD-02',
            'commission_rate': Decimal('5.00')
        }
    )

    r1, _ = Route.objects.get_or_create(code='RT-AA-01', defaults={'name': 'Route AA-01 Al Jimi', 'zone': z_alain, 'driver_salesman': s1})
    r2, _ = Route.objects.get_or_create(code='RT-AD-02', defaults={'name': 'Route AD-02 Al Khalidiyah', 'zone': z_abudhabi, 'driver_salesman': s2})

    # 4. Trucks
    t1, _ = Truck.objects.get_or_create(
        plate_no='DXB-78901',
        defaults={
            'truck_name': 'Isuzu NPR 4-Ton',
            'model': '2024',
            'capacity_5gal': 350,
            'driver_salesman': s1,
            'route': 'Route AA-01',
            'status': 'Active'
        }
    )
    t2, _ = Truck.objects.get_or_create(
        plate_no='AA-45210',
        defaults={
            'truck_name': 'Mitsubishi Canter',
            'model': '2023',
            'capacity_5gal': 300,
            'driver_salesman': s2,
            'route': 'Route AD-02',
            'status': 'Active'
        }
    )

    # 5. Products
    p1, _ = Product.objects.get_or_create(
        code='PRD-5GAL',
        defaults={
            'name': '5 Gallon Drinking Water',
            'category': 'Water 5 Gallon',
            'unit': 'Bottle',
            'cost_price': Decimal('3.50'),
            'selling_price': Decimal('7.50'),
            'stock_quantity': 4677,
            'min_stock': 200
        }
    )
    p2, _ = Product.objects.get_or_create(
        code='PRD-500ML',
        defaults={
            'name': '500ml PET Bottles (Pack of 24)',
            'category': 'Bottled Water (PET)',
            'unit': 'Carton',
            'cost_price': Decimal('10.00'),
            'selling_price': Decimal('16.00'),
            'stock_quantity': 520,
            'min_stock': 50
        }
    )
    p3, _ = Product.objects.get_or_create(
        code='PRD-EMPTY-BTL',
        defaults={
            'name': 'Empty 5 Gallon Polycarbonate Bottle',
            'category': 'Accessories & Coolers',
            'unit': 'Piece',
            'cost_price': Decimal('12.00'),
            'selling_price': Decimal('25.00'),
            'stock_quantity': 310,
            'min_stock': 30
        }
    )
    p4, _ = Product.objects.get_or_create(
        code='PRD-COOLER',
        defaults={
            'name': 'Hot & Cold Water Dispenser Cooler',
            'category': 'Dispensers',
            'unit': 'Unit',
            'cost_price': Decimal('220.00'),
            'selling_price': Decimal('380.00'),
            'stock_quantity': 45,
            'min_stock': 10
        }
    )

    # 6. Store Inventory records
    StoreInventory.objects.get_or_create(
        product=p1,
        batch_no='BATCH-2026-001',
        defaults={
            'quantity_in': 5000,
            'quantity_out': 323,
            'balance': 4677,
            'location': 'Al Ain Main Plant Warehouse'
        }
    )

    # 7. Customers
    c1, _ = Customer.objects.get_or_create(
        customer_code='CUST-AA-001',
        defaults={
            'name': 'Al Ain Palace Hotel',
            'customer_type': 'Corporate',
            'phone': '+971 3 763 1000',
            'email': 'procurement@alainpalace.ae',
            'city': 'AL AIN',
            'zone': 'Al Ain Central',
            'route': 'Route AA-01',
            'address': 'Al Jimi, Sector 4, Building 12',
            'credit_limit': Decimal('25000.00'),
            'current_balance': Decimal('5180.96'),
            'status': 'Active'
        }
    )
    c2, _ = Customer.objects.get_or_create(
        customer_code='CUST-AD-002',
        defaults={
            'name': 'Emirates Steel Staff Quarters',
            'customer_type': 'Corporate',
            'phone': '+971 2 550 4400',
            'email': 'supplies@emiratessteel.ae',
            'city': 'ABU DHABI',
            'zone': 'Abu Dhabi Corniche',
            'route': 'Route AD-02',
            'address': 'Musaffah ICAD 1',
            'credit_limit': Decimal('50000.00'),
            'current_balance': Decimal('18450.00'),
            'status': 'Active'
        }
    )
    c3, _ = Customer.objects.get_or_create(
        customer_code='CUST-AA-003',
        defaults={
            'name': 'Fatima Al Kaabi Villa',
            'customer_type': 'Individual',
            'phone': '+971 50 882 1993',
            'email': 'fatima.kaabi@gmail.com',
            'city': 'AL AIN',
            'zone': 'Al Ain Central',
            'route': 'Route AA-01',
            'address': 'Falaj Hazza Villa 18',
            'credit_limit': Decimal('1000.00'),
            'current_balance': Decimal('150.00'),
            'status': 'Active'
        }
    )

    # Wallets for customers
    w1, _ = Wallet.objects.get_or_create(customer=c1, defaults={'balance': Decimal('1250.00'), 'reward_points': 450})
    w2, _ = Wallet.objects.get_or_create(customer=c3, defaults={'balance': Decimal('320.00'), 'reward_points': 120})

    # Orders
    o1, _ = Order.objects.get_or_create(
        order_no='ORD-2026-1001',
        defaults={
            'customer': c1,
            'salesman': s1,
            'delivery_date': date.today(),
            'status': 'Delivered',
            'total_amount': Decimal('1125.00'),
            'payment_method': 'Credit',
            'payment_status': 'Unpaid',
            'route': 'Route AA-01',
            'city': 'AL AIN'
        }
    )
    OrderItem.objects.get_or_create(order=o1, product=p1, defaults={'quantity': 150, 'unit_price': Decimal('7.50'), 'total_price': Decimal('1125.00')})

    # Invoices
    Invoice.objects.get_or_create(
        invoice_no='INV-2026-0045',
        defaults={
            'order': o1,
            'customer': c1,
            'due_date': date.today() + timedelta(days=30),
            'subtotal': Decimal('1125.00'),
            'tax_amount': Decimal('56.25'),
            'total_amount': Decimal('1181.25'),
            'paid_amount': Decimal('0.00'),
            'status': 'Sent'
        }
    )

    # Cashier Transactions
    CashierTransaction.objects.get_or_create(
        transaction_no='TXN-2026-0891',
        defaults={
            'customer': c1,
            'salesman': s1,
            'amount': Decimal('18613.24'),
            'payment_type': 'Collection',
            'payment_method': 'Cash',
            'reference_note': 'Daily driver route collection settlement'
        }
    )

    print("Seeding completed successfully!")

if __name__ == '__main__':
    seed()
