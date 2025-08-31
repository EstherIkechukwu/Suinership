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
Local (.env)
DEBUG=False
SECRET_KEY=<your-production-secret-key>
ALLOWED_HOSTS=localhost,127.0.0.1,<your-domain>
DB_NAME=<your-db-name>
DB_USER=<your-db-user>
DB_PASSWORD=<your-db-password>
DB_HOST=<your-db-host>
DB_PORT=5432
REDIS_HOST=<your-redis-host>
REDIS_PORT=6379
REDIS_PASSWORD=<your-redis-password>

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
git clone <repo-url>
cd Bill-station
python -m venv .venv
source .venv/bin/activate   # On Windows use .venv\Scripts\activate
pip install -r requirements.txt

python manage.py migrate
python manage.py runserver



Docker Setup

```bash


Build and run the project with Docker:
docker-compose build
docker-compose up

Run migrations inside Docker:

```bash
docker-compose exec web python manage.py migrate
