from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from rest_framework import generics, status
from .serializers import EventSerializer, CreateEventSerializer, SportSerializer
from .models import Event, Sport
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests

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

class GetEventsBySport(APIView):
  serializer_class = EventSerializer
  lookup_url_kwarg = 'sport'

  def get(self, request, format=None):
      sport = request.GET.get(self.lookup_url_kwarg)
      if sport != None:
          events = Event.objects.filter(sport=sport)
          if len(events) > 0:
              data = []
              for event in events:
                  event_data = EventSerializer(event).data
                  data.append(event_data)
              return Response(data, status=status.HTTP_200_OK)
          return Response({'No Events Found': 'Sport Not Found'}, status=status.HTTP_404_NOT_FOUND)
      return Response({'Bad Request': 'Sport parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)

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