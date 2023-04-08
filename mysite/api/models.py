from django.db import models
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

    def __str__(self):
        return f"{self.sport} | {self.date} | {self.time}"

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
