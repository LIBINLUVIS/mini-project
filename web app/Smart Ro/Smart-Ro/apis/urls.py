from knox import views as knox_views
from .views import RegisterAPI,LoginAPI
from django.urls import path
from . import views


urlpatterns = [
    path('api/register/', RegisterAPI.as_view(), name='register'),
    path('api/login/', LoginAPI.as_view(), name='login'),
    path('api/roplants',views.roplants,name='roplants'),
    path('api/rodatas/',views.rodatas,name='rodatas'),
    path('api/userros/',views.userros,name='userros'), 
    path('api/message/<str:user>/',views.message,name='message'),
    path('api/userscan/<str:uuid>/',views.userscan,name='userscan'),
    path('api/updatescan/<str:uuid>/',views.updatescanvalue,name='updatescanvalue'),
    path('api/mqttx/<int:pk>/',views.mqttx,name='mqttx')
] 
