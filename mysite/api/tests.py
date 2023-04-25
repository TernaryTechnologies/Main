from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from django.utils import timezone
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.test import APIClient, APITestCase
from rest_framework import status
from decimal import Decimal
from .models import Sport, Event, PlayerEvent
from .serializers import SportSerializer, EventSerializer, PlayerEventSerializer
from datetime import datetime

# Create your tests here.

class ModelTestCase(TestCase):
    def setUp(self):
        self.sport = Sport.objects.create(name="soccer")
        self.event = Event.objects.create(
            sport=self.sport,
            latitude=Decimal('37.421999'),
            longitude=Decimal('-122.084057'),
            beginner_friendly=True,
            women_only=False
        )

    def test_create_sport(self):
        sport_count = Sport.objects.count()
        self.assertEqual(sport_count, 1)

    def test_create_event(self):
        event_count = Event.objects.count()
        self.assertEqual(event_count, 1)

class SerializerTestCase(TestCase):
    def setUp(self):
        self.sport = Sport.objects.create(name="soccer")
        self.event = Event.objects.create(
            sport=self.sport,
            latitude=Decimal('37.421999'),
            longitude=Decimal('-122.084057'),
            beginner_friendly=True,
            women_only=False
        )

    def test_sport_serializer(self):
        serialized_sport = SportSerializer(self.sport).data
        self.assertEqual(serialized_sport['name'], self.sport.name)

    def test_event_serializer(self):
        serialized_event = EventSerializer(self.event).data
        self.assertEqual(serialized_event['sport']['name'], self.sport.name)
        self.assertEqual(serialized_event['latitude'], str(self.event.latitude))
        self.assertEqual(serialized_event['longitude'], str(self.event.longitude))
        self.assertEqual(serialized_event['beginner_friendly'], self.event.beginner_friendly)
        self.assertEqual(serialized_event['women_only'], self.event.women_only)

class ViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.sport = Sport.objects.create(name="soccer")
        self.event = Event.objects.create(
            sport=self.sport,
            latitude=Decimal('37.421999'),
            longitude=Decimal('-122.084057'),
            beginner_friendly=True,
            women_only=False
        )

    def test_get_events(self):
        response = self.client.get(reverse('event_list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_event(self):
        sport_name = self.sport.name
        event_data = {
            'sport_name': sport_name,
            'latitude': '37.336190',
            'longitude': '-121.890583',
            'beginner_friendly': True,
            'women_only': False
        }
        response = self.client.post(reverse('create_event'), event_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Event.objects.count(), 2)

def create_test_data():
    sport1 = Sport.objects.create(name="Basketball")
    sport2 = Sport.objects.create(name="Soccer")

    now = timezone.now()
    Event.objects.create(sport=sport1, date=now.date(), time=now.time(), latitude=40.7128, longitude=-74.0060, beginner_friendly=True, women_only=False)
    Event.objects.create(sport=sport2, date=now.date(), time=now.time(), latitude=40.7128, longitude=-74.0060, beginner_friendly=False, women_only=True)
    Event.objects.create(sport=sport1, date=now.date(), time=now.time(), latitude=40.7590, longitude=-73.9845, beginner_friendly=True, women_only=True)

class FilteredEventViewTest(APITestCase):
    def setUp(self):
        create_test_data()

    def test_filter_by_sport(self):
        url = reverse('filtered_events')  # Make sure to update this with the actual name of your view in urls.py
        response = self.client.get(url, {'sport': 'Basketball'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_filter_by_beginner_friendly(self):
        url = reverse('filtered_events')
        response = self.client.get(url, {'beginner_friendly': 'true'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_filter_by_women_only(self):
        url = reverse('filtered_events')
        response = self.client.get(url, {'women_only': 'true'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_filter_by_range(self):
        url = reverse('filtered_events')
        response = self.client.get(url, {'user_lat': '40.7128', 'user_lng': '-74.0060', 'range': '1'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_filter_by_multiple_criteria(self):
        url = reverse('filtered_events')
        response = self.client.get(url, {'sport': 'Basketball', 'beginner_friendly': 'true', 'women_only': 'true', 'user_lat': '40.8330', 'user_lng': '-74.0661', 'range': '7'})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

class PlayerEventTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.sport = Sport.objects.create(name='Basketball')
        self.event = Event.objects.create(
            sport=self.sport,
            date='2023-05-01',
            time='10:00:00',
            latitude='-37.8136',
            longitude='144.9631',
            beginner_friendly=True,
            women_only=False
        )
        self.join_event_url = reverse('join-event', kwargs={'pk': self.event.pk})
        self.leave_event_url = reverse('leave-event', kwargs={'pk': self.event.pk})

    def _get_auth_headers(self):
        refresh = RefreshToken.for_user(self.user)
        access_token = str(refresh.access_token)
        return {'HTTP_AUTHORIZATION': f'Bearer {access_token}'}

    def test_join_event(self):
        auth_headers = self._get_auth_headers()

        response = self.client.post(self.join_event_url, **auth_headers)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        player_event = PlayerEvent.objects.first()
        self.assertIsNotNone(player_event)
        self.assertEqual(player_event.player, self.user)
        self.assertEqual(player_event.event, self.event)

    def test_leave_event(self):
        auth_headers = self._get_auth_headers()

        # First, join the event
        self.client.post(self.join_event_url, **auth_headers)

        response = self.client.delete(self.leave_event_url, **auth_headers)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        player_event = PlayerEvent.objects.first()
        self.assertIsNone(player_event)

    def test_player_event_serializer(self):
        player_event = PlayerEvent.objects.create(player=self.user, event=self.event)
        serializer = PlayerEventSerializer(player_event)

        self.assertEqual(serializer.data, {
            'id': player_event.pk,
            'player': {
                'id': self.user.pk,
                'username': self.user.username,
                'email': self.user.email,
                'first_name': self.user.first_name
            },
            'joined_at': player_event.joined_at.isoformat().replace('+00:00', 'Z')
        })