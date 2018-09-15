from django.db import models


class Camera(models.Model):
    name = models.CharField(max_length=64)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)