from django.shortcuts import render
from django.db import models
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets
from api.models import Chat,Message
from api.serializers import TokenSerializer,ChatSerializer,MessageSerializer,RegisterSerializer,UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
import json
import requests
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, login
from django.http import HttpResponseBadRequest

API_URL = "https://api-inference.huggingface.co/models/Boray/LLama2SA_1500_V2_Tag"
DUMMY_API_URL = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-large"
API_TOKEN = "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"
headers = {"Authorization": f"Bearer {API_TOKEN}"}

def inferenceAPIQuery(payload):
    data = json.dumps(payload)
    response = requests.request("POST", DUMMY_API_URL, headers=headers, data=data)
    return json.loads(response.content.decode("utf-8"))


# @api_view(['GET'])
# def get(request):
#     users = User.objects.all()
#     users_serialized = UserSerializer(users , many = True)
#     return(Response(users_serialized.data))

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class ChatViewSet(viewsets.ModelViewSet):
    serializer_class = ChatSerializer
    queryset = Chat.objects.all()

class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    queryset = Message.objects.all()

class TokenView(TokenObtainPairView):
    serializer_class = TokenSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)



    

@api_view(['GET'])
def home(request):
    paths = {
        "API_PATHS":
            {
            "users": "http://127.0.0.1:8000/api/users/",
            "chats": "http://127.0.0.1:8000/api/chats/",
            "messages": "http://127.0.0.1:8000/api/messages/",
            "inference": "http://127.0.0.1:8000/api/inference/"
            }
        }
    return(Response(paths))

@api_view(['GET','POST'])
def inference(request):
    text_data = "Hello my name is Boray"

    if request.method == 'POST':
        text_data = request.data["prompt"]
        

    answer = inferenceAPIQuery(
    {
        "inputs": {
            "past_user_inputs": [],
            "generated_responses": [],
            "text": text_data,
        }
    }
    
)
    return(Response(answer))

@api_view(['POST'])
def authentiacte_user(request):
    username_form = request.data["username"]
    password_form = request.data["password"]

    user = authenticate(username = username_form , password = password_form)

    if(user is not None):
        login(request, user)
        return(Response({"Status":"Login Succesfull.","username":username_form,"password":password_form}))

    else:
        return(Response({"Status":"Invalid Username or Password","username":username_form,"password":password_form}))

        
# Create your views here.


