from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('crm/', include('app.alqattara.urls')),
    path('salesman/', include('app.salesman.urls')),
    path('customers/', include('app.customers.urls')),
]
