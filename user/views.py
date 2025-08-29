from pyexpat.errors import messages

from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from user.serializer import UserRegisterSerializer


# Create your views here.
@api_view(['POST'])
def register_user(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
    error_message = serializer.errors.get("email", ["invalid data"])[0]
    return Response({"message": error_message}, status=status.HTTP_400_BAD_REQUEST)
