from rest_framework import status
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.cameras.models import Camera
from apps.tags.models import Tag
from apps.videoframes.models import VideoFrame
from apps.videoframes.serializers import VideoFrameSerializer


class VideoFrameList(ListAPIView):
    queryset = VideoFrame.objects.all()
    serializer_class = VideoFrameSerializer


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
        return Response(serializer.data, status.HTTP_201_CREATED)        