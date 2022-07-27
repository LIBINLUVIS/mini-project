from datetime import datetime
from optparse import Values
from unittest import result
from django.shortcuts import render
from datetime import datetime
from rest_framework import generics, permissions
from paho.mqtt import client as mqtt_client
from rest_framework.response import Response
from knox.models import AuthToken
from knox.views import LoginView as KnoxLoginView
from django.contrib.auth import login
from rest_framework.authtoken.serializers import AuthTokenSerializer
from .serializers import UserSerializer, RegisterSerializer,RoPlantsSerializer,timeSerializer,ScaningSerializer
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from .models import Roplant,userro
from twilio.rest import Client

from apis import serializers

# Create your views here.



class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
        "user": UserSerializer(user, context=self.get_serializer_context()).data,
        "token": AuthToken.objects.create(user)[1]
        })


class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginAPI, self).post(request, format=None)


@api_view(['GET'])
def roplants(request):
    roplants=Roplant.objects.all()
    serializer=RoPlantsSerializer(roplants,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def rodatas(request):  # ardiuno
    data=request.data
    x=timeSerializer(data={'current_time':datetime.now()})
    Roplant.objects.create(
        user=data['user'],
        Ph=data['Ph'],
        tds=data['tds'],
        location=data['location'],
        time=x.data
    )

    return Response('data saved')

@api_view(['GET'])
def userros(request):
    user=request.user # react use authorization token in header to get the login user
    ros=Roplant.objects.all()
    datas=[]
    for x in ros:
        if(str(user)==str(x.user)):
            val=RoPlantsSerializer(x)
            datas.append(val.data)

    return Response(datas)


@api_view(['GET'])
def message(request,user):
    user=user                  # api used in ardiuno for msg user name should be with url or data=request['user']
    ros=Roplant.objects.all()
    number=[]
    for x in ros:
        if(str(user)==str(x.user)): 
            phone=x.phone
            if(not phone in number):
                number.append(phone)

            account_sid = 'AC47a2c7976258727a7912f7df53f86901'
            auth_token = 'e25ee96361d08c309e65f98b1a8a2d17'
            client = Client(account_sid, auth_token)

            message = client.messages.create(
                     body=f"Alert - The Current TDS Value is above 150ppm  at Location - {x.location} Please Make the Service!",
                     from_='+18507897140',
                     to=phone
                 )

    return Response('message sended')



@api_view(['GET'])
def userscan(request,uuid):
    data=userro.objects.get(unique_id=uuid)
    res=ScaningSerializer(data)
    return Response(res.data)


@api_view(['POST'])
def updatescanvalue(request,uuid):
    val=userro.objects.get(unique_id=uuid)
    data=request.data
    val.tds=data['tds']
    val.ph=data['ph']

    val.save()
    serializer=ScaningSerializer(val)
    return Response(serializer.data)


@api_view(['GET'])
def mqttx(request,pk):
    # temp_value=[]
    broker = 'broker.emqx.io'
    port = 1883
    topic = f"libin/adishankara/tds/{pk}" # "libin/adishankara/tds/user_id" using 'f' string
    client_id = 'mqttx_36d01581'
    username = 'emqx'
    password = '12345'
    def connect_mqtt() -> mqtt_client:
            def on_connect(client, userdata, flags, rc):
                if rc==0:
                    print("connected to mqtt broker")
                else:
                    print("Failed to connect, return code %d\n", rc)

            client = mqtt_client.Client(client_id)
            client.username_pw_set(username, password)
            client.on_connect = on_connect
            client.connect(broker, port)
            return client
    def subscribe(client: mqtt_client):
        def on_message(client, userdata, msg):
            #print(f"Received `{msg.payload.decode()}` from `{msg.topic}` topic")
            values=Roplant.objects.get(id=pk)
            data1=str(msg.payload)
            
            val=data1[2:4]
            print("hello")
            values.tds=val
            values.save()
        
            # serializer=RoPlantsSerializer(values)
            # temp_value.append(serializer.data)
            
        client.subscribe(topic)
        client.on_message = on_message 


    
    def run():
        client=connect_mqtt()
        subscribe(client)
        #client.loop_forever()
        
    run()
    # updated_values=Roplant.objects.get(id=pk)
    # serializer=RoPlantsSerializer(updated_values)

    return Response("")






    






    










