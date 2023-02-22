from django.shortcuts import render
# Create your views here.
from django.http import HttpResponse

def hello(request):
    return HttpResponse("Hello, world!")


def joke(request):
    return HttpResponse("YOU WILL LAUGH")


