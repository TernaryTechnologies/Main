from django.urls import path
from .views import index

urlpatterns = [
    path('', index, name='index'),
    path('create', index, name='create'),
    path('test', index, name = 'test'),
]