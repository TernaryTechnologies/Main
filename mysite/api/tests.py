from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from decimal import Decimal
from .models import Sport, Event, Game
from .serializers import SportSerializer, EventSerializer
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


# These tests cover the basic functionality of the Game model:
# - checking that _str_ method returns expected string representation of a Game instance 
# - sport field is properly associated with a Sport instance
# - other fields contain the expected values.

class GameModelTestCase(TestCase):
    def setUp(self):
        self.sport = Sport.objects.create(name='Basketball')
        self.game = Game.objects.create(
            name='Weekend Pickup',
            sport=self.sport,
            location='Central Park',
            date=datetime.strptime('2023-03-20', '%Y-%m-%d').date(),
            time=datetime.strptime('13:00', '%H:%M').time(),
            players='John, Jane, Bob',
            description='Friendly game of basketball'
        )

    def test_game_name(self):
        self.assertEqual(str(self.game), 'Weekend Pickup')

    def test_game_sport(self):
        self.assertEqual(self.game.sport, self.sport)

    def test_game_location(self):
        self.assertEqual(self.game.location, 'Central Park')

    def test_game_date(self):
        self.assertEqual(self.game.date.strftime('%Y-%m-%d'), '2023-03-20')

    def test_game_time(self):
        self.assertEqual(self.game.time.strftime('%H:%M'), '13:00')

    def test_game_players(self):
        self.assertEqual(self.game.players, 'John, Jane, Bob')

    def test_game_description(self):
        self.assertEqual(self.game.description, 'Friendly game of basketball')