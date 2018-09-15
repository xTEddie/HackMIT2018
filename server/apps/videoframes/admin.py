from django.contrib import admin
from apps.videoframes.models import VideoFrame


class VideoFrameAdmin(admin.ModelAdmin):
    list_display = ('id', 'image', 'tag', 'uploaded_at')


admin.site.register(VideoFrame, VideoFrameAdmin)
