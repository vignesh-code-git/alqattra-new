from rest_framework import serializers
from .models import Salesman, Truck, TruckStockTransaction, CommissionReport

class TruckStockTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TruckStockTransaction
        fields = '__all__'

class TruckSerializer(serializers.ModelSerializer):
    driver_name = serializers.ReadOnlyField(source='driver_salesman.name')
    stock_transactions = TruckStockTransactionSerializer(many=True, read_only=True)

    class Meta:
        model = Truck
        fields = '__all__'

class CommissionReportSerializer(serializers.ModelSerializer):
    salesman_name = serializers.ReadOnlyField(source='salesman.name')

    class Meta:
        model = CommissionReport
        fields = '__all__'

class SalesmanSerializer(serializers.ModelSerializer):
    trucks = TruckSerializer(many=True, read_only=True)
    commissions = CommissionReportSerializer(many=True, read_only=True)

    class Meta:
        model = Salesman
        fields = '__all__'
