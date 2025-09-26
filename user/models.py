from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models
import os

# Create your models here.
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        if not getattr(user, "user_salt", None):
            user.user_salt = os.urandom(16).hex()
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        if not extra_fields.get("is_staff"):
            raise ValueError("Superuser must have is_staff=True.")
        if not extra_fields.get("is_superuser"):
            raise ValueError("Superuser must have is_superuser=True.")
        if not password:
            raise ValueError("Superusers must have a password.")
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
     username = None
     full_name = models.CharField( max_length=255)
     email = models.EmailField( unique=True, blank=True, null=True)
     google_id = models.CharField(max_length=255, blank=True, null=True, unique=True)
     user_salt = models.CharField(max_length=255, unique=True, blank=True, null=True)


     USERNAME_FIELD = "email"
     REQUIRED_FIELDS = []

     objects = CustomUserManager()

