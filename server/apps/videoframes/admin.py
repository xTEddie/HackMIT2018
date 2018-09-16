from django.contrib import admin
from apps.videoframes.models import VideoFrame


class VideoFrameAdmin(admin.ModelAdmin):
    list_display = ('id', 'camera', 'image', 'tag', 'safety_status', 'uploaded_at')


admin.site.register(VideoFrame, VideoFrameAdmin)
