import uuid

from django.core.cache import cache
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from user.models import User
from user.serializer import UserRegisterSerializer, LoginTokenSerializer, LoginTokenRefreshSerializer, \
    PasswordResetTokenSerializer
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
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def request_password_reset(request):
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
@permission_classes([IsAuthenticated])
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
       return Response({"message": "Password reset token sent to your email"}, status=status.HTTP_200_OK)
    error_message = next(iter(serializer.errors.values()))[0]
    return Response({"message": error_message}, status=status.HTTP_400_BAD_REQUEST)


