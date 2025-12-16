from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Our custom auth endpoints
    path('api/auth/', include('accounts.urls')),
    
    # Social authentication endpoints (Google, Facebook)
    path('api/auth/', include('dj_rest_auth.urls')),
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),
    path('api/auth/social/', include('allauth.urls')),
]
