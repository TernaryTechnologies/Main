from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from .serializers import EventSerializer
from .models import Event
from rest_framework.views import APIView
from rest_framework.response import Response

import csv

# Create your views here.

class EventView(generics.ListAPIView):
  queryset = Event.objects.all()
  serializer_class = EventSerializer

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

def index(request):
  return HttpResponse("Hello, you are at the events index")

def read_csv(filename):
  db = []
  with open(filename, 'r') as read_obj:
    csv_reader = csv.reader(read_obj)

    list_of_csv = list(csv_reader)
    
    for event in list_of_csv:
      entry = {}
      entry["sport"] = event[0]
      entry["city"] = event[1]
      entry['date'] = event[2]
      db.append(entry)

  return db

def search(request, sport):
  sport = sport.lower()
  db = read_csv('db_file.csv')
  result_list = []
  print(sport)
  for entry in db:
    if entry["sport"].lower() == sport:
      result_list.append(entry)
  
  return HttpResponse(str(result_list))