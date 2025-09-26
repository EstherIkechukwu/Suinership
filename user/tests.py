from django.test import TestCase, Client
from django.urls import reverse
from rest_framework import status

from .models import User


# Create your tests here.


class RegistrationTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.url = reverse('register')
        self.user_data = {
    "email": "test1@example.com",
    "full_name": "John Doe",
    "password": "StrongPass123!"
}

        self.user_weak_password_data = {
            "full_name": "Test User",
            "email": "testWeakPassword@email.com",
            "password": "12345"
        }

        self.user_missing_field_data = {
            "email": "testMissingField@example.com",
            "password": "PASSWOR09876"
        }

    def test_register_user_success(self):
        response = self.client.post(self.url, self.user_data, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json()["message"], "User registered successfully")
        self.assertTrue(User.objects.filter(email="testuser@example.com").exists())

    def test_register_user_already_exists(self):
        first_response = self.client.post(self.url, self.user_data, content_type='application/json')
        self.assertEqual(first_response.status_code, status.HTTP_201_CREATED)
        response = self.client.post(self.url, self.user_data, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json()["message"], "This email is already registered.")
        self.assertTrue(User.objects.filter(email="testuser@example.com").exists())

    def test_password_is_weak(self):
        response = self.client.post(self.url, self.user_weak_password_data, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json()["message"], "Password must be 8+ characters,"
                                                     " not common, not numeric only,"
                                                     " or too similar to personal info.")

    def test_missing_fields(self):
            response = self.client.post(self.url,  self.user_missing_field_data, content_type='application/json')
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
            self.assertEqual(response.json()["message"], "This field is required.")
