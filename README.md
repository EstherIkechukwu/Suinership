# Auth Service
A simple User Authentication System built with Django, PostgreSQL, and Redis.
Supports registration, login, JWT authentication, and password reset.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <https://github.com/Lawbod3/Bill-stattion.git>
   cd auth_service
   
 2. Create a virtual environment and activate it:  
python3 -m venv .venv
source .venv/bin/activate  # macOS/Linux
.venv\Scripts\activate     # Windows


3. Install dependencies: 
pip install -r requirements.txt


4. Create a .env file in the project root with the following variables:
SECRET_KEY=your_secret_key
DB_NAME=your_database_name
DB_USER=your_database_username
DB_PASSWORD=your_database_password
DB_HOST=localhost 
DB_PORT=your_port
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
REDIS_PASSWORD=your_redis_password


5. Run migrations:
python manage.py makemigrations
python manage.py migrate


6. Run Server