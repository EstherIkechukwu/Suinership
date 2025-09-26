#!/bin/bash

set -e

echo "Waiting for environment to be ready..."
sleep 5

echo "Running migrations..."
python manage.py migrate --noinput || echo "Migrations failed, but continuing startup..."

# Flush the database to fix broken migrations (danger: deletes all data)
echo "Flushing database..."
python manage.py flush --no-input || echo "Flush failed, continuing..."

echo "Starting server..."
PORT=${PORT:-10000}
exec gunicorn --bind 0.0.0.0:$PORT service.wsgi:application
