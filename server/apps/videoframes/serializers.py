from rest_framework import serializers
from apps.videoframes.models import VideoFrame
from apps.tags.serializers import TagSerializer
from apps.cameras.serializers import CameraSerializer


class VideoFrameSerializer(serializers.ModelSerializer):
    tag = TagSerializer(read_only=True)
    camera = CameraSerializer(read_only=True)

    class Meta:
        model = VideoFrame
        fields = '__all__'