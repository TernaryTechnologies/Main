from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.db.models import Q
from rest_framework import generics, status
from .serializers import EventSerializer, CreateEventSerializer, SportSerializer, ReverseGeocodeSerializer
from .models import Event, Sport
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests
import math

def haversine_distance(lat1, lon1, lat2, lon2):
    # Convert latitude and longitude to radians
    lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])

    # Haversine formula
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = math.sin(dlat / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
    c = 2 * math.asin(math.sqrt(a))

    # Earth's radius in miles (approximately)
    earth_radius_miles = 3958.8

    # Calculate the distance in miles
    distance = earth_radius_miles * c
    
    return distance


# Create your views here.

class EventView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class CreateEventView(APIView):
    def post(self, request):
        serializer = CreateEventSerializer(data=request.data)
        if serializer.is_valid():
            event = serializer.save()
            return Response(EventSerializer(event).data, status=status.HTTP_201_CREATED)
        else:
            print("Serializer errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FilteredEventView(generics.ListAPIView):
    serializer_class = EventSerializer

    def get_queryset(self):
        queryset = Event.objects.all()

        sport = self.request.query_params.get('sport', None)
        beginner_friendly = self.request.query_params.get('beginner_friendly', None)
        women_only = self.request.query_params.get('women_only', None)
        date = self.request.query_params.get('date', None)
        time = self.request.query_params.get('time', None)
        user_lat = float(self.request.query_params.get('user_lat', 0))
        user_lng = float(self.request.query_params.get('user_lng', 0))
        range_miles = float(self.request.query_params.get('range', 0))

        filters = Q()

        if sport:
            filters &= Q(sport__name__iexact=sport)

        if beginner_friendly is not None:
            if beginner_friendly == 'true':
                filters &= Q(beginner_friendly=True)

        if women_only is not None:
            filters &= Q(women_only=(women_only == 'true'))

        if date:
            filters &= Q(date=date)

        if time:
            filters &= Q(time=time)

        queryset = queryset.filter(filters)

        if range_miles > 0 and user_lat != 0 and user_lng != 0:
            # Filter events within the specified range
            queryset = [event for event in queryset if haversine_distance(user_lat, user_lng, event.latitude, event.longitude) <= range_miles]

        return queryset

class ReverseGeocodeView(APIView):
    def get(self, request):
        latitude = request.GET.get('latitude')
        longitude = request.GET.get('longitude')

        if not latitude or not longitude:
            return Response({"error": "Missing latitude or longitude parameters"}, status=400)

        response = requests.get(f'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat={latitude}&lon={longitude}')
        data = response.json()

        result = {
            "latitude": float(latitude),
            "longitude": float(longitude),
            "address": data['display_name'],
        }

        serializer = ReverseGeocodeSerializer(result)
        return Response(serializer.data)

@api_view(['GET'])
def geocode(request):
    address = request.GET.get('address', '')
    api_key = 'AIzaSyB_sMVgUoBDYt8hNkW_cEorXESyE93jOgg'
    url = f'https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={api_key}'

    try:
        response = requests.get(url)
        data = response.json()
        return Response(data)
    except Exception as e:
        print("Error geocoding address:", e)
        return Response({"error": "Error geocoding address"}, status=500)

def index(request):
    return HttpResponse("Hello, you are at the api index")