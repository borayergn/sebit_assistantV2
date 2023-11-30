from django.contrib import admin
from django.urls import path,include
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from django.contrib.auth import views as auth_views

router = DefaultRouter()

router.register(r'users',views.UserViewSet,basename='users')
router.register(r'chats',views.ChatViewSet,basename='chats')
router.register(r'messages',views.MessageViewSet,basename='messages')
router.register(r'apiKeys',views.ApiKeyViewSet,basename='apiKeys')
router.register(r'user_images',views.BlobViewSet,basename="images")


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
    path('api/invoke',views.invoke),
    path('api/test/countToken',views.countToken),
    path('auth/reset_password/', auth_views.PasswordResetView.as_view(), name ='reset_password'),
    path('auth/reset_password_sent/', auth_views.PasswordResetDoneView.as_view(), name ='password_reset_done'),
    path('auth/reset/<uidb64>/<token>', auth_views.PasswordResetConfirmView.as_view(), name ='password_reset_confirm'),
    path('auth/reset_password_complete/', auth_views.PasswordResetCompleteView.as_view(), name ='password_reset_complete'),
    path('api/get_api_key',views.generateApiKey),
    path('key/authenticate_key',views.authenticate_key),
    path('key/invoke_key',views.invoke_key)
    #path('auth/session_test',views.session_test)
]