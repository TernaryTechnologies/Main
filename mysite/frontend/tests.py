from django.test import TestCase
from .models import Sport, Game, Player, Team, GameRegistration
from datetime import date

# Create your tests here.

class SportModelTest(TestCase):
    def test_sport_model(self):
        sport = Sport.objects.create(name="Basketball", description="A game played with a ball and hoop.")
        self.assertEqual(str(sport), "Basketball")
        self.assertEqual(sport.description, "A game played with a ball and hoop.")

class GameModelTest(TestCase):
    def test_game_model(self):
        sport = Sport.objects.create(name="Basketball", description="A game played with a ball and hoop.")
        game = Game.objects.create(name="Pickup Game", sport=sport, location="Central Park", date=date(2022, 1, 1))
        self.assertEqual(str(game), "Pickup Game")
        self.assertEqual(game.location, "Central Park")

class PlayerModelTest(TestCase):
    def test_player_model(self):
        player = Player.objects.create(name="John Doe", age=25, email="johndoe@example.com")
        self.assertEqual(str(player), "John Doe")
        self.assertEqual(player.age, 25)
        self.assertEqual(player.email, "johndoe@example.com")

class TeamModelTest(TestCase):
    def test_team_model(self):
        sport = Sport.objects.create(name="Basketball", description="A game played with a ball and hoop.")
        player = Player.objects.create(name="John Doe", age=25, email="johndoe@example.com")
        team = Team.objects.create(name="Team A", sport=sport)
        team.players.add(player)
        self.assertEqual(str(team), "Team A")
        self.assertEqual(team.players.count(), 1)

class GameRegistrationModelTest(TestCase):
    def test_game_registration_model(self):
        sport = Sport.objects.create(name="Basketball", description="A game played with a ball and hoop.")
        game = Game.objects.create(name="Pickup Game", sport=sport, location="Central Park", date=date(2022, 1, 1))
        player = Player.objects.create(name="John Doe", age=25, email="johndoe@example.com")
        registration = GameRegistration.objects.create(game=game, player=player)
        self.assertEqual(registration.game, game)
        self.assertEqual(registration.player, player)
        self.assertIsNone(registration.team)

        team = Team.objects.create(name="Team A", sport=sport)
        team.players.add(player)
        registration.team = team
        registration.save()
        self.assertEqual(registration.team, team)
