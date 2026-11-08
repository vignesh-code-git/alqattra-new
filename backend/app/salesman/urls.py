from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SalesmanViewSet, TruckViewSet, TruckStockTransactionViewSet, CommissionReportViewSet

router = DefaultRouter()
router.register(r'salesmen', SalesmanViewSet, basename='salesman')
router.register(r'trucks', TruckViewSet, basename='truck')
router.register(r'stock-transactions', TruckStockTransactionViewSet, basename='stock-transaction')
router.register(r'commissions', CommissionReportViewSet, basename='commission')

urlpatterns = [
    path('', include(router.urls)),
]
