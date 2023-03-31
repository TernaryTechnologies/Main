from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import HttpResponse
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer

class loginView(APIView):
    serializer_class = UserSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            un = serializer.data.get('username')
            pw = serializer.data.get('password')

            # see if it's a real user. If so, login
            user = authenticate(username=un, password=pw)
            if user is not None:
                login(request, user)
                return Response(UserSerializer(user).data, status=status.HTTP_202_ACCEPTED)
            
            else:
                return Response(UserSerializer(user).data, status=status.HTTP_404_NOT_FOUND)

        else:
            print("Serializer errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class logoutView(APIView):

    def post(self, request, format=None):
      logout(request)


#class editMember():
    

# Create your views here
# tutorial used:
#https://www.youtube.com/watch?v=CTrVDi3tt8o
