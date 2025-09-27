import uuid
import requests
import random
import jwt

from django.core.cache import cache
from django.core.mail import send_mail
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from google.oauth2 import id_token
from ratelimit.decorators import ratelimit
from google.auth.transport import requests as google_requests

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import datetime, timedelta

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from service import settings
from user.models import User
from user.serializer import UserRegisterSerializer, LoginTokenSerializer, LoginTokenRefreshSerializer, \
    PasswordResetTokenSerializer, GoogleAuthCallbackSerializer
from user.swagger_schemas import USER_REGISTER_RESPONSES, RESET_PASSWORD_RESPONSES, RSET_PASSWORD_REQUEST_BODY, \
    CONFIRM_RESET_PASSWORD_RESPONSES, LOGIN_RESPONSES


# Create your views here.
@swagger_auto_schema(
    method='post',
    request_body=UserRegisterSerializer,
    responses=USER_REGISTER_RESPONSES
)
@api_view(['POST'])
def register_user(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
    error_message = next(iter(serializer.errors.values()))[0]
    return Response({"message": error_message}, status=status.HTTP_400_BAD_REQUEST)

class GoogleAuthRedirectView(APIView):
    def get(self, request):
        auth_url = (
            "https://accounts.google.com/o/oauth2/v2/auth"
            "?response_type=code"
            f"&client_id={settings.GOOGLE_CLIENT_ID}"
            f"&redirect_uri={settings.GOOGLE_REDIRECT_URI}"
            "&scope=openid%20email%20profile"
            "&access_type=offline"
            "&prompt=select_account"
        )
        return Response({"auth_url": auth_url})
    
class GoogleAuthCallbackView(APIView):
    def get(self, request):
        code = request.query_params.get("code")
        error = request.query_params.get("error")
        if error:
            return Response({"error": f"OAuth error: {error}"}, status=400)
        if not code:
            return Response({"error": "Missing code"}, status=400)


        token_url = "https://oauth2.googleapis.com/token"
        data = {
            "code": code,
            "client_id": settings.GOOGLE_CLIENT_ID,
            "client_secret": settings.GOOGLE_CLIENT_SECRET,
            "redirect_uri": settings.GOOGLE_REDIRECT_URI,
            "grant_type": "authorization_code",
        }
        r = requests.post(token_url, data=data)
        token_response = r.json()

        if "id_token" not in token_response:
            return Response(
                {"error": "Failed to get tokens", "details": token_response},
                status=400
            )

        id_token_str = token_response["id_token"]
        access_token = token_response["access_token"]


        try:
            id_info = id_token.verify_oauth2_token(
                id_token_str,
                google_requests.Request(),
                settings.GOOGLE_CLIENT_ID
            )
        except Exception as e:
            return Response({"error": "Invalid ID token", "details": str(e)}, status=400)

        email = id_info.get("email")
        google_id = id_info.get("sub")
        full_name = id_info.get("name", "")

        # Step 3: Check if user exists
        if User.objects.filter(email=email).exists():
            return Response(
                {"error": "This email is already registered. Please log in instead."},
                status=400
            )


        user = User.objects.create_user(
            email=email,
            google_id=google_id,
            full_name=full_name
        )

        refresh = RefreshToken.for_user(user)
        jwt_tokens = {
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }
        response_data = {
            "user": {
                "email": user.email,
                "google_id": user.google_id,
                "full_name": user.full_name,
                "user_salt": user.user_salt,
            },
            "jwt": jwt_tokens,
            "google_access_token": access_token,
        }

        return Response(response_data, status=201)

class GoogleLoginAuthRedirectView(APIView):
    def get(self, request):
        auth_url = (
            "https://accounts.google.com/o/oauth2/v2/auth"
            "?response_type=code"
            f"&client_id={settings.GOOGLE_CLIENT_ID}"
            f"&redirect_uri={settings.GOOGLE_LOGIN_REDIRECT_URI}"
            "&scope=openid%20email%20profile"
            "&access_type=offline"
            "&prompt=select_account"
        )
        return Response({"auth_url": auth_url})

class GoogleLoginCallbackView(APIView):
    def get(self, request):
        code = request.query_params.get("code")
        if not code:
            return Response({"error": "Missing code"}, status=400)

        # Exchange code for tokens
        token_url = "https://oauth2.googleapis.com/token"
        data = {
            "code": code,
            "client_id": settings.GOOGLE_CLIENT_ID,
            "client_secret": settings.GOOGLE_CLIENT_SECRET,
            "redirect_uri": settings.GOOGLE_LOGIN_REDIRECT_URI,
            "grant_type": "authorization_code",
        }
        r = requests.post(token_url, data=data)
        token_response = r.json()

        if "id_token" not in token_response:
            return Response({"error": "Failed to get tokens", "details": token_response}, status=400)

        id_token_str = token_response["id_token"]

        # Decode ID token
        try:
            id_info = id_token.verify_oauth2_token(
                id_token_str,
                google_requests.Request(),
                settings.GOOGLE_CLIENT_ID
            )
        except Exception as e:
            return Response({"error": "Invalid ID token", "details": str(e)}, status=400)

        email = id_info.get("email")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"error": "User not registered. Please sign up first."},
                status=404
            )

        refresh = RefreshToken.for_user(user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "email": user.email,
                "full_name": user.full_name,
                "google_id": user.google_id,
                "user_salt": user.user_salt,
            }
        }, status=200)

class RequestOTPView(APIView):
    def post(self, request):
        email = request.data.get("email")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"error": "User not registered. Please sign up."},
                status=404
            )

        otp = str(random.randint(100000, 999999))
        cache.set(f"otp:{email}", otp, timeout=300)  # store in cache for 5 min

        send_mail(
            subject="Your Login OTP",
            message=f"Your OTP is {otp}. It will expire in 5 minutes.",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
        )

        return Response({"message": "OTP sent to email."}, status=200)





class LoginTokenView(TokenObtainPairView):
    serializer_class = LoginTokenSerializer

    @swagger_auto_schema(
        request_body=LoginTokenSerializer,
        responses=LOGIN_RESPONSES,
        operation_description="Login with email and password, returns access and refresh tokens"
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)



class LoginTokenRefreshView(TokenRefreshView):
    serializer_class = LoginTokenRefreshSerializer


@swagger_auto_schema(
    method='post',
    request_body=RSET_PASSWORD_REQUEST_BODY,
    responses=RESET_PASSWORD_RESPONSES
)
@ratelimit(key='ip', rate='5/15m')
@api_view(['POST'])
def request_password_reset(request):
    if getattr(request, 'limited', False):
        return Response(
            {"message": "Too many reset attempts. Please try again later."},
            status=status.HTTP_429_TOO_MANY_REQUESTS
        )
    email = request.data.get('email')
    if not email:
       return Response({"message": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)
    user = User.objects.filter(email=email).first()
    if not user:
        return Response({"message": "User not found."}, status=status.HTTP_404_NOT_FOUND)
    token = str(uuid.uuid4())
    cache.set(f"password_reset:{token}", user.id, timeout=600)
    return Response({"token": token}, status=status.HTTP_200_OK)



@swagger_auto_schema(
    method='post',
    request_body=PasswordResetTokenSerializer,
    responses=CONFIRM_RESET_PASSWORD_RESPONSES
)

@api_view(['POST'])
def reset_password(request):
    serializer = PasswordResetTokenSerializer(data=request.data)
    if serializer.is_valid():
       token = serializer.validated_data['token']
       user_id = cache.get(f"password_reset:{token}")
       if not user_id:
           return Response({"message": "User not found."}, status=status.HTTP_404_NOT_FOUND)
       user = User.objects.get(id=user_id)
       user.set_password(serializer.validated_data['new_password'])
       user.save()
       cache.delete(f"password_reset:{token}")
       return Response({"message": "Password changed successfully"}, status=status.HTTP_200_OK)
    error_message = next(iter(serializer.errors.values()))[0]
    return Response({"message": error_message}, status=status.HTTP_400_BAD_REQUEST)


