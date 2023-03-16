from django.db import models

# Create your models here.

class Sport(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Game(models.Model):
    name = models.CharField(max_length=200)
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE)
    location = models.CharField(max_length=200)
    date = models.DateField()
    time = models.TimeField()
    players = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return self.name

# class game(models.Model):
#     day = models.CharField(max_length=9)
#     lastRegisteredParticipation = models.DateTimeField()