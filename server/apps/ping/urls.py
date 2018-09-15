from django.urls import path
from .views import ping

urlpatterns = [
    path(r'ping', ping),
]
