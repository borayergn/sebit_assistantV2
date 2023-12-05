from django.db import models
from django import utils
from django.contrib.auth.models import User

import base64

class BlobField(models.Model):
    
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    data = models.TextField(db_column='data',blank=True,null=True)
    image = models.ImageField(upload_to="profile_photos",blank=True,null=True)

class Usage(models.Model):
    
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    input_tokens = models.PositiveIntegerField(default=0)
    output_tokens = models.PositiveBigIntegerField(default=0)
    create_time = models.DateTimeField(auto_now_add= True)


class Chat(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    chat_name = models.CharField(max_length = 50,default="New Chat")
    create_time = models.DateTimeField(auto_now_add= True)
    update_time = models.DateTimeField(auto_now=True)


class Message(models.Model):
    content = models.CharField()
    chat = models.ForeignKey(Chat,on_delete=models.CASCADE)
    sort_order = models.PositiveIntegerField(default=0)
    sender = models.CharField(max_length=4,default="user")

class ApiKey(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    key_hash = models.CharField()
    key_name = models.CharField(max_length=30)
    create_time = models.DateTimeField(auto_now_add= True)
    update_time = models.DateTimeField(auto_now=True)

# Create your models here.