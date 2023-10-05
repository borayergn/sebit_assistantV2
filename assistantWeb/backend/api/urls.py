from django.contrib import admin
from django.urls import path,include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'users',views.UserViewSet,basename='users')
router.register(r'chats',views.ChatViewSet,basename='chats')
router.register(r'messages',views.MessageViewSet,basename='messages')

urlpatterns = [
    path('api/',include(router.urls)),
    path('api/inference',views.inference)
]