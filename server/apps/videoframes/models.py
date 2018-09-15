from django.db import models
import datetime
import os


def get_image_path(instance, filename):
    return os.path.join('images', filename)


class VideoFrame(models.Model):
    image = models.ImageField(upload_to=get_image_path, blank=False, null=False)
    uploaded_at = models.DateTimeField(blank=True, null=True)
    tag = models.ForeignKey('tags.tag', related_name='videoframes', on_delete=models.CASCADE, blank=True)
    camera = models.ForeignKey('cameras.camera', related_name='cameras', on_delete=models.CASCADE, blank=True)

    def save(self, *args, **kwargs): 
        if not self.id:
            self.uploaded_at = datetime.datetime.now()

        return super(VideoFrame, self).save(*args, **kwargs)
        
    class Meta:
        ordering = ['uploaded_at']
