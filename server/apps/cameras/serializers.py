from rest_framework import serializers
from apps.cameras.models import Camera

class CameraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Camera
        fields = '__all__'