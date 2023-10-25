from django.contrib import admin
from django.urls import path,include
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

router = DefaultRouter()

router.register(r'users',views.UserViewSet,basename='users')
router.register(r'chats',views.ChatViewSet,basename='chats')
router.register(r'messages',views.MessageViewSet,basename='messages')

urlpatterns = [

    path('',views.home),
    path('api/',include(router.urls)),
    path('api/inference',views.inference),
    path('api/register',views.RegisterView.as_view()),
    path('auth/',views.TokenView.as_view()),
    path('auth/refresh',TokenRefreshView.as_view()),
    path('auth/authenticate_user',views.authentiacte_user),
    path('auth/logout',views.logout_user),
    path('auth/check_auth',views.check_auth),
    path('api/testLLama',views.checkLangServe),
    #path('auth/session_test',views.session_test)
]