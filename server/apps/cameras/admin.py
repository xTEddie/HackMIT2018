from django.contrib import admin
from apps.cameras.models import Camera


class CameraAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'longitude', 'latitude')


admin.site.register(Camera, CameraAdmin)