from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from user.models import User

class UserLoginTests(APITestCase):

    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(
            email="testuser@example.com",
            full_name="Test User",
            password="StrongPassword123"
        )
        self.login_url = reverse('login')
        self.refresh_url = reverse('login_token_refresh')

    def test_login_with_correct_credentials(self):
        data = {
            "email": "testuser@example.com",
            "password": "StrongPassword123"
        }
        response = self.client.post(self.login_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

        refresh_token = response.data['refresh']
        refresh_response = self.client.post(self.refresh_url, {'refresh': refresh_token}, format='json')
        self.assertEqual(refresh_response.status_code, status.HTTP_200_OK)
        self.assertIn('access', refresh_response.data)

    def test_login_with_invalid_email(self):
        data = {"email": "wrong@example.com", "password": "StrongPassword123"}
        response = self.client.post(self.login_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


