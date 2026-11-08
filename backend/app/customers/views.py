from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Customer, CustomerStatement
from .serializers import CustomerSerializer, CustomerStatementSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['customer_code', 'name', 'phone', 'email', 'city', 'zone', 'route']
    ordering_fields = ['name', 'created_at', 'current_balance', 'credit_limit']

    def get_queryset(self):
        qs = super().get_queryset()
        city = self.request.query_params.get('city')
        status_param = self.request.query_params.get('status')
        if city and city != 'ALL':
            qs = qs.filter(city=city)
        if status_param:
            qs = qs.filter(status=status_param)
        return qs

    @action(detail=True, methods=['get'])
    def statement(self, request, pk=None):
        customer = self.get_object()
        statements = customer.statements.all()
        serializer = CustomerStatementSerializer(statements, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def soft_delete(self, request, pk=None):
        customer = self.get_object()
        customer.status = 'Deleted'
        customer.save()
        return Response({'status': 'Customer marked as deleted'})

class CustomerStatementViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CustomerStatement.objects.all()
    serializer_class = CustomerStatementSerializer
