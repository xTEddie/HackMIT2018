python manage.py makemigrations
python manage.py migrate
python manage.py loaddata apps/accounts/fixtures/users.json
python manage.py loaddata apps/cameras/fixtures/cameras.json
python manage.py loaddata apps/tags/fixtures/tags.json