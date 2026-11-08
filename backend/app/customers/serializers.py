from rest_framework import serializers
from .models import Customer, CustomerStatement

class CustomerStatementSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerStatement
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    statements = CustomerStatementSerializer(many=True, read_only=True)

    class Meta:
        model = Customer
        fields = '__all__'
