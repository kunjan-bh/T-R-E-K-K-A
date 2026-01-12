from django.urls import path
from .views import SherpaRegisterView, SherpaListView, MySherpaStatusView, SherpaUpdateView

urlpatterns = [
    path('register/', SherpaRegisterView.as_view()),
    path('list/', SherpaListView.as_view()),
    path('me/', MySherpaStatusView.as_view()),
    path('update/', SherpaUpdateView.as_view()),  # <-- add this
]
