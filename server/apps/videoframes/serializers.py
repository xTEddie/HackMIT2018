from rest_framework import serializers
from apps.videoframes.models import VideoFrame
from apps.tags.serializers import TagSerializer


class VideoFrameSerializer(serializers.ModelSerializer):
    tag = TagSerializer(read_only=True)

    class Meta:
        model = VideoFrame
        fields = '__all__'