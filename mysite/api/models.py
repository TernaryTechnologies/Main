from django.db import models
from datetime import date, time
import string
import random

def generate_unique_code():
  length = 6

  while True:
    code = ''.join(random.choices(string.ascii_uppercase, k=length))
    if Event.objects.filter(code=code).count() == 0:
      break
  
  return code


# Create your models here.

class Event(models.Model):
  code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
  sport = models.CharField(max_length=15)
  city = models.CharField(max_length=30)
  date = models.DateField(default=date.today)
  time = models.TimeField(default=time(10, 00))


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

