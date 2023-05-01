from django.urls import path
from .views import RegisterView, LoginView, ListUsersView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('users/', ListUsersView.as_view(), name='users'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]