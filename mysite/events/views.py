from django.shortcuts import render
from django.http import HttpResponse

import csv

# Create your views here.

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