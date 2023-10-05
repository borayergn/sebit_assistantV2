from django.shortcuts import render
from django.db import models
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets
from api.models import User,Chat,Message
from api.serializers import UserSerializer,ChatSerializer,MessageSerializer
import json
import requests

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
# Create your views here.


