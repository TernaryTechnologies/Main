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

