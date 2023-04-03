from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from .serializers import UserSerializer, RegisterSerializer

# Create your tests here.
class SerializerTests(APITestCase):
    def test_register_serializer(self):
        data = {
            'username': 'testuser',
            'password': 'testpassword',
            'email': 'test@example.com',
            'first_name': 'Test',
            'last_name': 'User',
        }
        serializer = RegisterSerializer(data=data)
        self.assertTrue(serializer.is_valid())

    def test_user_serializer(self):
        user = User.objects.create_user(
            username='testuser',
            password='testpassword',
            email='test@example.com',
            first_name='Test',
            last_name='User',
        )
        serializer = UserSerializer(user)
        expected_data = {
            'id': user.id,
            'username': 'testuser',
            'email': 'test@example.com',
            'first_name': 'Test',
        }
        self.assertEqual(serializer.data, expected_data)

class AuthenticationTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser',
            password='testpassword',
            email='test@example.com',
            first_name='Test',
            last_name='User',
        )

    def test_register_view(self):
        url = reverse('register')
        data = {
            'username': 'newuser',
            'password': 'newpassword',
            'email': 'newuser@example.com',
            'first_name': 'New',
            'last_name': 'User',
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
        self.assertIn('user', response.data)

    def test_login_view(self):
        url = reverse('login')
        data = {
            'username': 'testuser',
            'password': 'testpassword',
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
        self.assertIn('user', response.data)

