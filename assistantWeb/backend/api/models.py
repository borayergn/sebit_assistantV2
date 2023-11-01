from django.db import models
from django import utils
from django.contrib.auth.models import User


class Chat(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    chat_name = models.CharField(max_length = 50,default="New Chat")
    create_time = models.DateTimeField(auto_now_add= True)
    update_time = models.DateTimeField(auto_now=True)


class Message(models.Model):
    content = models.CharField(max_length=200)
    chat = models.ForeignKey(Chat,on_delete=models.CASCADE)
    sort_order = models.PositiveIntegerField(default=0)
    sender = models.CharField(max_length=4,default="user")

# Create your models here.
