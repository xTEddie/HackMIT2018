from django.urls import path
from apps.videoframes.views import VideoFrameList, VideoFrameCreate


urlpatterns = [
    # List video frames
    path(r'videoframes', VideoFrameList.as_view(), name='videoframe_list'),

    # Create video frame
    path(r'videoframe/new', VideoFrameCreate.as_view(), name='videoframe_create')
]
