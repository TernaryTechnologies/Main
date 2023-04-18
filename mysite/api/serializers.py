from rest_framework import serializers
from .models import Event, Sport

class SportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sport
        fields = ['id', 'name']

class EventSerializer(serializers.ModelSerializer):
    sport = SportSerializer()

    class Meta:
        model = Event
        fields = [
            'id',
            'sport',
            'date',
            'time',
            'latitude',
            'longitude',
            'beginner_friendly',
            'women_only',
        ]

class CreateEventSerializer(serializers.ModelSerializer):
    sport_name = serializers.CharField()

    class Meta:
        model = Event
        fields = [
            'sport_name',
            'date',
            'time',
            'latitude',
            'longitude',
            'beginner_friendly',
            'women_only',
        ]

    def create(self, validated_data):
        sport_name = validated_data.pop('sport_name').lower()
        sport = Sport.objects.filter(name=sport_name).first()

        if not sport:
            raise serializers.ValidationError({"sport_name": "This sport does not exist."})

        event = Event.objects.create(sport=sport, **validated_data)
        return event

class ReverseGeocodeSerializer(serializers.Serializer):
    latitude = serializers.FloatField()
    longitude = serializers.FloatField()
    address = serializers.CharField()