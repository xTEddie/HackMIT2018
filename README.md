# HackMIT2018


- Install Python dependencies

```
    cd server
    pip3 install -r requirements/dev.txt
```

- Export Google API Credentials

```
export GOOGLE_APPLICATION_CREDENTIALS='google_vision_secrets.json'
```

- Database setup

```
    python3 manage.py createsuperuser admin
    python3 manage.py createsuperuser makemigrations
    python3 manage.py createsuperuser migrate
```

- Run Django app

```
    python manage.py runserver 0.0.0.0:8000
```

- Install node dependencies

```
    cd client
    yarn install
```

- Run React app

```
    yarn run start
```

