# Bill Station – Authentication Service

Bill Station is a **Django-based authentication and user management service**.  
It provides:

- ✅ User registration  
- ✅ Login with JWT tokens  
- ✅ Password reset (request + confirm)  
- ✅ Role-based access control  

---

##  Features
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
s
##  Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/bill-station.git
cd bill-station
