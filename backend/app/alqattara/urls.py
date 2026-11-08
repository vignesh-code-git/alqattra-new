from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProductViewSet, StoreInventoryViewSet, OrderViewSet,
    InvoiceViewSet, CashierTransactionViewSet, WalletViewSet,
    ZoneViewSet, RouteViewSet, MasterItemViewSet, dashboard_overview
)

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'inventory', StoreInventoryViewSet, basename='inventory')
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'invoices', InvoiceViewSet, basename='invoice')
router.register(r'cashier', CashierTransactionViewSet, basename='cashier')
router.register(r'wallets', WalletViewSet, basename='wallet')
router.register(r'zones', ZoneViewSet, basename='zone')
router.register(r'routes', RouteViewSet, basename='route')
router.register(r'masters', MasterItemViewSet, basename='master')

urlpatterns = [
    path('dashboard-overview/', dashboard_overview, name='dashboard-overview'),
    path('', include(router.urls)),
]
