from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Our custom auth endpoints (for email/password login)
    path('api/auth/', include('accounts.urls')),
    
    # Social authentication endpoints (Google, Facebook OAuth callbacks)
    path('accounts/', include('allauth.urls')),
]