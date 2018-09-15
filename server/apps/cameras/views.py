from django.shortcuts import render
from rest_framework.generics import ListAPIView, CreateAPIView
from apps.cameras.models import Camera
from apps.cameras.serializers import CameraSerializer


class CameraList(ListAPIView):
    queryset = Camera.objects.all()
    serializer_class = CameraSerializer
