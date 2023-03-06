from django.db import models

# Create your models here.


class game(models.Model):
    day = models.CharField(max_length=9)
    lastRegisteredParticipation = models.DateTimeField()