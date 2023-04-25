from django.db import models
from django.contrib.auth.models import User
from datetime import date, time
import string
import random

# Create your models here.

class Sport(models.Model):
    name = models.CharField(max_length=15, unique=True)

    def __str__(self):
        return self.name

class Event(models.Model):
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE)
    date = models.DateField(default=date.today)
    time = models.TimeField(default=time(10, 00))
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    beginner_friendly = models.BooleanField(default=False)
    women_only = models.BooleanField(default=False)
    players = models.ManyToManyField(User, through='PlayerEvent', related_name='joined_events')

    def __str__(self):
        return f"{self.sport} | {self.date} | {self.time}"

class PlayerEvent(models.Model):
    player = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('player', 'event')

    def __str__(self):
        return f"{self.player.username} joined {self.event.sport.name} event"
