from django.contrib import admin

from .models import User,Chat,Message
from django.contrib.auth.models import User

admin.site.register(Chat)
admin.site.register(Message)


