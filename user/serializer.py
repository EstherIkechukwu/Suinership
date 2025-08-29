from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from .models import User


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True,  required=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ( 'full_name', 'email', 'password')

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            full_name=validated_data['full_name'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user





