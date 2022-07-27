from dataclasses import field
from pyexpat import model
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.settings import api_settings
from .models import Roplant, userro



# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])

        return user

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class RoPlantsSerializer(serializers.ModelSerializer):
    class Meta:
        model=Roplant
        fields='__all__'

class ScaningSerializer(serializers.ModelSerializer):
    class Meta:
        model=userro
        fields='__all__'

class timeSerializer(serializers.Serializer):
    current_time=serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S")