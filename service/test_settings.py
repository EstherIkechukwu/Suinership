
import os


if os.environ.get('DB_HOST'):
    print("Using PostgreSQL - DB_HOST is set to:", os.environ.get('DB_HOST'))
    db_config = 'postgresql'
elif os.environ.get('DATABASE_URL'):
    print("Using DATABASE_URL")
    db_config = 'postgresql_url'
else:
    print("Using SQLite fallback")
    db_config = 'sqlite'

print("Selected database:", db_config)