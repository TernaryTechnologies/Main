from django.urls import path

from . import views
from .views import EventView, GetEventsBySport, CreateEventView

urlpatterns = [
  path('', views.index, name='index'),
  path('get', GetEventsBySport.as_view()),
  path('all', EventView.as_view()),
  path('create-event', CreateEventView.as_view())
]
