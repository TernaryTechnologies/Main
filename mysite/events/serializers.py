from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
  class Meta:
    model = Event
    fields = ('id', 'code', 'sport', 'city', 'datetime')

class CreateEventSerializer(serializers.ModelSerializer):
  class Meta:
    model = Event
    fields = ('sport', 'city', 'datetime')