from django.urls import path

from . import views
from .views import EventView

urlpatterns = [
  path('', views.index, name='index'),
  path('sport/<sport>', views.search, name='search'),
  path('all', EventView.as_view())
]
