from django.shortcuts import render
from rest_framework.generics import ListAPIView, CreateAPIView
from apps.tags.models import Tag
from apps.tags.serializers import TagSerializer


class TagList(ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
