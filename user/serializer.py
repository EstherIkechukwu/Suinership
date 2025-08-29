from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as PasswordValidationError
from rest_framework import serializers
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User


class UserRegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, validators=[])
    password = serializers.CharField(write_only=True,  required=True,)

    class Meta:
        model = User
        fields = ( 'full_name', 'email', 'password')

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already registered.")
        return value
    def validate_password(self, value):
        try:
            validate_password(value)
        except PasswordValidationError:
            raise serializers.ValidationError("Password must be 8+ characters, not common, not numeric only, or too similar to personal info.")
        return value

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            full_name=validated_data['full_name'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class LoginTokenSerializer(TokenObtainPairSerializer):
     @classmethod
     def get_token(cls, user):
         token = super().get_token(user)
         token["role"] = "admin" if (user.is_superuser or user.is_staff) else "user"
         token["user_id"] = user.id
         return token

class LoginTokenRefreshSerializer(TokenRefreshSerializer):
      def validate(self, attrs):
          data = super().validate(attrs)
          refresh = RefreshToken(attrs['refresh'])
          user = User.objects.filter(id=refresh['user_id']).first()
          if not user:
              raise InvalidToken("User does not exist.")
          if getattr(user, 'banned', False) or not user.is_active:
              raise InvalidToken("User is not allowed to refresh token.")
          return data







