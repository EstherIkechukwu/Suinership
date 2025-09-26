# user/signals.py
from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import User
import os

@receiver(pre_save, sender=User)
def ensure_user_salt(sender, instance, **kwargs):
    if not instance.user_salt:
        instance.user_salt = int.from_bytes(os.urandom(16), "big")
