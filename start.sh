#!/bin/bash

#python manage.py migrate --noinput

#exec gunicorn --bind 0.0.0.0:10000 service.wsgi:application



# Exit immediately if a command fails
set -e

# Wait for Railway to inject environment variables
echo "Waiting for environment to be ready..."
sleep 3

echo "Running migrations..."
python manage.py migrate --noinput

echo "Starting server..."
exec gunicorn --bind 0.0.0.0:$PORT service.wsgi:application