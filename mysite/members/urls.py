from django.urls import path
from . import views

urlpatterns =[
    
    path('logon', views.loginView.as_view(), name='logonAPI'),
    #path('logout', views.logoutView.as_View(), name='logoutAPI'),
    #path('editMember', views.editMemberView.as_View(), name='editMemberAPI'),
    #path('registerMember', views.registerMemberView.as_View(), name='registerMemberAPI'),

]