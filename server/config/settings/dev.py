from .base import *

DEBUG = True
ALLOWED_HOSTS = ['*']

PROJECT_APPS = [
    'apps.ping.apps.PingConfig',
    'apps.cameras.apps.CamerasConfig',
    'apps.tags.apps.TagsConfig'
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + PROJECT_APPS

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
