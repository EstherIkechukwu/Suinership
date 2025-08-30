from django.core.cache import cache
from django.test import TestCase, Client
from django.urls import reverse
from rest_framework import status

from user.models import User


class UpdatePasswordTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            full_name='Test User',
            email='test@example.com',
            password='password12345',
        )
        self.client = Client()
        self.password_reset_request_url = reverse('password_reset_request')
        self.password_reset_confirm_url = reverse('password_reset_confirm')


    def test_update_password_success(self):
        response = self.client.post(self.password_reset_request_url, {"email": self.user.email}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        token_key = cache.keys("password_reset:*")[0]
        token = token_key.split(":")[1]
        user_id = cache.get(f"password_reset:{token}")
        self.assertIsNotNone(user_id, self.user.id)

        new_password = "newTestPassword12345"
        confirm_response = self.client.post(self.password_reset_confirm_url, {"token":token, "new_password": new_password}, format='json')
        self.assertEqual(confirm_response.status_code, status.HTTP_200_OK)

        login_url = reverse('login')
        login_response = self.client.post(login_url, {"email": self.user.email, "password": new_password}, format='json')
        self.assertEqual(login_response.status_code, status.HTTP_200_OK)
        self.assertIn("access", login_response.data)
        self.assertIn("refresh", login_response.data)




