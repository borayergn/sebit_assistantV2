from django.db import models
from django import utils

class User(models.Model):
    nick_name = models.CharField(max_length=50)
    email = models.CharField(max_length=50,unique=True)
    api_key = models.CharField(max_length=50,unique=True)
    password = models.CharField(max_length=50)
    register_time = models.DateTimeField(default = utils.timezone.now())

class Chat(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    chat_name = models.CharField(max_length = 50,default="New Chat")
    create_time = models.DateTimeField(default = utils.timezone.now())
    update_time = models.DateTimeField(default = utils.timezone.now())


class Message(models.Model):
    content = models.CharField(max_length=200)
    chat = models.ForeignKey(Chat,on_delete=models.CASCADE)
    sort_order = models.PositiveIntegerField(default=0)
    sender = models.CharField(max_length=4,default="user")

# Create your models here.
