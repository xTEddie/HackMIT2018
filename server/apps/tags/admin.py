from django.contrib import admin
from apps.tags.models import Tag


class TagAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')


admin.site.register(Tag, TagAdmin)
