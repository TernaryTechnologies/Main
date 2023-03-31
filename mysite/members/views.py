from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages

def login_user(request):
    return render(request, 'authenticate/login.html', {})

def logout_user(request):
    return render(request, 'authenticate/logout.html', {})

# Create your views here
# tutorial used:
#https://www.youtube.com/watch?v=CTrVDi3tt8o
