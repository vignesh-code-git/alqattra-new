from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Salesman, Truck, TruckStockTransaction, CommissionReport
from .serializers import SalesmanSerializer, TruckSerializer, TruckStockTransactionSerializer, CommissionReportSerializer

class SalesmanViewSet(viewsets.ModelViewSet):
    queryset = Salesman.objects.all()
    serializer_class = SalesmanSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['salesman_code', 'name', 'mobile', 'email', 'assigned_route']
    ordering_fields = ['name', 'created_at']

    def get_queryset(self):
        qs = super().get_queryset()
        city = self.request.query_params.get('city')
        if city and city != 'ALL':
            qs = qs.filter(city=city)
        return qs

class TruckViewSet(viewsets.ModelViewSet):
    queryset = Truck.objects.all()
    serializer_class = TruckSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['plate_no', 'truck_name', 'route', 'driver_salesman__name']

    def get_queryset(self):
        qs = super().get_queryset()
        status_param = self.request.query_params.get('status')
        if status_param:
            qs = qs.filter(status=status_param)
        return qs

class TruckStockTransactionViewSet(viewsets.ModelViewSet):
    queryset = TruckStockTransaction.objects.all()
    serializer_class = TruckStockTransactionSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['date']

class CommissionReportViewSet(viewsets.ModelViewSet):
    queryset = CommissionReport.objects.all()
    serializer_class = CommissionReportSerializer
