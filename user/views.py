from pyexpat.errors import messages

from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from user.serializer import UserRegisterSerializer, LoginTokenSerializer, LoginTokenRefreshSerializer


# Create your views here.
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

class LoginTokenRefreshView(TokenRefreshView):
    serializer_class = LoginTokenRefreshSerializer
