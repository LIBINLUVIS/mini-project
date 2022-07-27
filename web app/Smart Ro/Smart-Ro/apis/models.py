from sqlite3 import Timestamp
import uuid
from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Roplant(models.Model):
    user=models.CharField(max_length=100,blank=True,null=True) 
    tds=models.CharField(max_length=100,blank=True,null=True)
    Ph=models.CharField(max_length=100,blank=True, null=True)
    location = models.CharField(max_length=200,blank=True, null=True)
    time=models.DateTimeField();
    phone=models.CharField(max_length=100,blank=True,null=True)

    def __str__(self):
        return self.location

class userro(models.Model):
    tds=models.CharField(max_length=100,blank=True,null=True)
    ph=models.CharField(max_length=100,blank=True,null=True)
    unique_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True,blank=True,null=True)




