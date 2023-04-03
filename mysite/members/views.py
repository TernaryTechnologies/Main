from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import generics, status, views
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAdminUser
from .serializers import RegisterSerializer, UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken

class ListUsersView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

class RegisterView(generics.CreateAPIView):
  queryset = User.objects.all()
  serializer_class = RegisterSerializer

  def create(self, request, *args, **kwargs):
    response = super().create(request, *args, **kwargs)
    if response.status_code == status.HTTP_201_CREATED:
      user = User.objects.get(username=request.data['username'])
      refresh = RefreshToken.for_user(user)
      serializer = UserSerializer(user)
      response.data.update({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'user': serializer.data,
      })
    return response

class LoginView(views.APIView):
  def post(self, request, *args, **kwargs):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
      refresh = RefreshToken.for_user(user)
      serializer = UserSerializer(user)
      data = {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'user': serializer.data,
      }
      return Response(data, status=status.HTTP_200_OK)
    else:
      return Response(status=status.HTTP_401_UNAUTHORIZED)
