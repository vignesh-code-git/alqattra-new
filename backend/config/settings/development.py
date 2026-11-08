import dj_database_url
from .base import *
from decouple import config

DEBUG = True

# PostgreSQL Configuration
DATABASE_URL = config('DATABASE_URL', default=None)
USE_POSTGRES = config('USE_POSTGRES', default=True, cast=bool)

if DATABASE_URL:
    DATABASES = {
        'default': dj_database_url.parse(
            DATABASE_URL,
            conn_max_age=600,
            conn_health_checks=True,
            ssl_require=config('DB_SSL_REQUIRE', default=False, cast=bool),
        )
    }
elif USE_POSTGRES:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': config('DB_NAME', default='alqattara_db'),
            'USER': config('DB_USER', default='alqattara'),
            'PASSWORD': config('DB_PASSWORD', default='alqattara123'),
            'HOST': config('DB_HOST', default='localhost'),
            'PORT': config('DB_PORT', default='5432'),
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }
