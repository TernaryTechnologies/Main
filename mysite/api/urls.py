from django.urls import path
from . import views
from .views import EventView, GetEventsBySport, CreateEventView, index

urlpatterns = [
  path('', index, name='index'),
  path('get', GetEventsBySport.as_view()),
  path('all', EventView.as_view(), name='event_list'),
  path('create-event', CreateEventView.as_view(), name='create_event'),
  path('geocode/', views.geocode, name='geocode'),
]
