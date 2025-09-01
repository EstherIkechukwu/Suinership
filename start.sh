#!/bin/bash

#python manage.py migrate --noinput

#exec gunicorn --bind 0.0.0.0:10000 service.wsgi:application



# Exit immediately if a command fails
set -e

# Wait for environment to be ready
echo "Waiting for environment to be ready..."
sleep 5

# Check if database is available (if using PostgreSQL)
# echo "Checking database connection..."
# if command -v psql > /dev/null; then
#   until psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -c '\q'; do
#     echo "PostgreSQL is unavailable - sleeping"
#     sleep 1
#   done
# fi

echo "Running migrations..."
# Try running migrations, but continue if they fail (sometimes apps can run without complete migrations)
python manage.py migrate --noinput || echo "Migrations failed, but continuing startup..."

echo "Starting server..."
PORT=${PORT:-10000}
exec gunicorn --bind 0.0.0.0:$PORT service.wsgi:application