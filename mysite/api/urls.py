from django.urls import path
from . import views
from .views import EventView, CreateEventView, FilteredEventView

urlpatterns = [
  path('all', EventView.as_view(), name='event_list'),
  path('create-event', CreateEventView.as_view(), name='create_event'),
  path('geocode/', views.geocode, name='geocode'),
  path('reverse_geocode/', views.ReverseGeocodeView.as_view(), name='reverse_geocode'),
  path('filtered/', FilteredEventView.as_view(), name='filtered_events'),
  path('events/<int:pk>/join/', views.JoinEventView.as_view(), name='join-event'),
  path('events/<int:pk>/leave/', views.LeaveEventView.as_view(), name='leave-event'),
]
