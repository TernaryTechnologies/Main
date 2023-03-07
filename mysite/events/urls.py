from django.urls import path

from . import views
from .views import EventView, GetEventsBySport

urlpatterns = [
  path('', views.index, name='index'),
  path('get', GetEventsBySport.as_view()),
  #path('sport/<sport>', views.search, name='search'),
  path('all', EventView.as_view())
]
