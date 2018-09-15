from django.urls import path
from apps.videoframes.views import VideoFrameList


urlpatterns = [
    path(r'videoframes', VideoFrameList.as_view(), name='videoframe_list'),
]
