from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from apps.videoframes.models import VideoFrame
from apps.videoframes.serializers import VideoFrameSerializer


class VideoFrameList(ListAPIView):
    queryset = VideoFrame.objects.all()
    serializer_class = VideoFrameSerializer

