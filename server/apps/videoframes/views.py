import os
import click
from rest_framework import status
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.cameras.models import Camera
from apps.tags.models import Tag
from apps.videoframes.models import VideoFrame
from apps.videoframes.serializers import VideoFrameSerializer
from utils.vision import get_tags
from django.conf import settings


class VideoFrameList(ListAPIView):
    queryset = VideoFrame.objects.all()
    serializer_class = VideoFrameSerializer

    def get_queryset(self):
        qs = super(VideoFrameList, self).get_queryset()
        qs = qs.order_by('-uploaded_at')
        return qs

class VideoFrameCreate(APIView):
    http_method_names = ['post']

    def post(self, request, format=None):
        
        camera_name = request.POST['camera_name']
        tag_name = request.POST['tag_name']  
        image = request.FILES['file']
        
        camera = Camera.objects.get(name=camera_name)
        tag, created = Tag.objects.get_or_create(name=tag_name)

        video_frame = VideoFrame(
            camera=camera,
            tag=tag,
            image=image
        )
        video_frame.save()
        serializer = VideoFrameSerializer(video_frame)
        print("FRAME RECEIVED")

        click.echo(click.style("{1} {0} {1}".format(camera_name, "="*70), fg='green', bold=True))

        # Send image to Google Vision API
        labels = get_tags(video_frame.image.path)

        classifications = [obj['label'] for obj in labels]
        tag_objects = Tag.objects.all()
        tags = [obj.name for obj in tag_objects]

        intersection = list(set(tags) & set(classifications))

        print("TAGS: {}".format(tags))
        import pprint
        pprint.pprint(labels)
        print("CLASSIFICATIONS: {}".format(classifications))

        # Threat found
        if len(intersection):
            click.echo(click.style("{0}".format('WARNING '*10), fg='red', bold=True))
            print(intersection)
            video_frame.safety_status = False
            video_frame.save()
    
        return Response(serializer.data, status.HTTP_201_CREATED)        