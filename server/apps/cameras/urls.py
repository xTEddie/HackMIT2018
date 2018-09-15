from django.urls import path
from apps.cameras.views import CameraList


urlpatterns = [
    path(r'cameras', CameraList.as_view(), name='camera_list'),
]
