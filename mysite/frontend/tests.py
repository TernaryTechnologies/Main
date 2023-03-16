from datetime import datetime
from django.test import TestCase
from frontend.models import Sport, Game

# Create your tests here.

# These tests cover the basic functionality of the Game model, including checking that the __str__ method returns the expected string representation of a Game instance, that the sport field is properly associated with a Sport instance, and that the other fields contain the expected values.

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