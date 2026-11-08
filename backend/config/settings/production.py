import dj_database_url
from .base import *
from decouple import config

DEBUG = config('DEBUG', default=False, cast=bool)

# Render & Production Host Configuration
allowed_hosts_raw = config('ALLOWED_HOSTS', default='*')
ALLOWED_HOSTS = [h.strip() for h in allowed_hosts_raw.split(',') if h.strip()]

# Database Configuration with Safe PostgreSQL Support
# Supports Render/Neon/Supabase DATABASE_URL or individual DB parameters
DATABASE_URL = config('DATABASE_URL', default=None)

if DATABASE_URL:
    DATABASES = {
        'default': dj_database_url.parse(
            DATABASE_URL,
            conn_max_age=600,
            conn_health_checks=True,
            ssl_require=config('DB_SSL_REQUIRE', default=False, cast=bool),
        )
    }
else:
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

# Security Headers for Production HTTPS (when behind Render reverse proxy)
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SESSION_COOKIE_SECURE = config('SESSION_COOKIE_SECURE', default=True, cast=bool)
CSRF_COOKIE_SECURE = config('CSRF_COOKIE_SECURE', default=True, cast=bool)
