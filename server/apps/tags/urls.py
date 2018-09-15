from django.urls import path
from apps.tags.views import TagList


urlpatterns = [
    path(r'tags', TagList.as_view(), name='tag_list'),
]
