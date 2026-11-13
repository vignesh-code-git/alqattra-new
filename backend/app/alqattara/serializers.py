from rest_framework import serializers
from .models import (
    Product, StoreInventory, Order, OrderItem,
    Invoice, CashierTransaction, Wallet, WalletRecharge,
    Zone, Route, MasterItem
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
