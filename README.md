# Bill Station – Authentication Service

Bill Station is a **Django-based authentication and user management service**.  
It provides:

- ✅ User registration  
- ✅ Login with JWT tokens  
- ✅ Password reset (request + confirm)  
- ✅ Role-based access control  

---

## Features

- RESTful API built with **Django Rest Framework (DRF)**  
- JWT authentication using **djangorestframework-simplejwt**  
- API documentation with **Swagger & Redoc**  
- Environment-specific configuration using `.env` and `.env.local`  
- Docker support for local development and deployment  

---

## Project Overview

- **Backend Framework:** Django  
- **Database:** PostgreSQL  
- **Caching:** Redis (for password reset tokens)  
- **Authentication:** JWT  
- **Development:** Docker  
- **Deployment:** Ready for Render or Railway  

---

## Requirements

- **Python:** 3.13+  
- **Docker & Docker Compose**  
- **Packages:** See `requirements.txt`  

---

## Environment Variables

### Local Development (`.env.local`)

```env
DEBUG=True
SECRET_KEY=<your-local-secret-key>
ALLOWED_HOSTS=localhost,127.0.0.1
DB_NAME=<your-local-db-name>
DB_USER=<your-local-db-user>
DB_PASSWORD=<your-local-db-password>
DB_HOST=127.0.0.1
DB_PORT=5432
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=<your-local-redis-password>


### Local Development (`.env.local`)

DEBUG=True
SECRET_KEY=<your-local-secret-key>
ALLOWED_HOSTS=localhost,127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=<your-local-redis-password>

##  Setup & Installation

Clone the repository and set up the environment:

```bash
git clone <https://github.com/Lawbod3/Bill-stattion.git>
cd Bill-station
python -m venv .venv
source .venv/bin/activate   # On Windows use .venv\Scripts\activate
pip install -r requirements.txt

python manage.py migrate
python manage.py runserver


## Docker Setup

```bash
Build and run the project with Docker:

docker-compose build
docker-compose up


Run migrations inside Docker:

```bash
docker-compose exec web python manage.py migrate


Collect static files:

```bash
docker-compose exec web python manage.py collectstatic --noinput

## Example docker-compose.yml
version: '3.8'

services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: billStation_db
      POSTGRES_USER: your_db_user
      POSTGRES_PASSWORD: your_db_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7
    command: redis-server --requirepass your_redis_password
    ports:
      - "6379:6379"

  web:
    build: .
    command: python manage.py runserver 0.0.0.0:8000
    volumes:
      - .:/app
    ports:
      - "8000:8000"
    environment:
      - DB_HOST=db
      - DB_PORT=5432
      - DB_NAME=your_db_name
      - DB_USER=your_db_user
      - DB_PASSWORD=your_db_password
      - REDIS_HOST=redis
      - REDIS_PORT=6379
      - REDIS_PASSWORD=your_redis_password
      - SECRET_KEY=your_django_secret_key
      - ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0
    depends_on:
      - db
      - redis

volumes:
  postgres_data:


## Notes
Use .env.local for local development
Use .env for production deployment
Swagger UI and Redoc should be available at:
/swagger/
/redoc/

##  Caching & Redis Behavior

When running **Django with `python manage.py runserver` locally**, caching with Redis may not work.  
This happens because:

- `REDIS_HOST=127.0.0.1` works only when Redis is installed directly on your machine.  
- In most setups, Redis is running inside **Docker**, so Django (running outside Docker) cannot reach it at `127.0.0.1`.  
- Inside Docker Compose, services talk to each other by their **service name** (e.g., `redis`), not `localhost`.  

  **Solution:**  
- If using **Docker**, set `REDIS_HOST=redis` in `.env.local` → Django connects correctly inside the container.  
- If using **runserver locally**, either:  
  - Install Redis on your host machine and keep `REDIS_HOST=127.0.0.1`, **or**  
  - Use Docker for both Django + Redis (recommended).  

---