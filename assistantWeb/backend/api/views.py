from django.shortcuts import render
from django.db import models
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets
from api.models import Chat,Message
from api.serializers import TokenSerializer,ChatSerializer,MessageSerializer,RegisterSerializer,UserSerializer,LoginSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
import json
import requests
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseBadRequest
from django.contrib.auth.decorators import login_required
import tiktoken

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

    def get_queryset(self):
        queryset = Chat.objects.all()
        user = self.request
        if user is not None:
            queryset =  Chat.objects.filter(user_id = user.session["_auth_user_id"])
        return queryset

    

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

    user = authenticate(request,username = username_form , password = password_form)

    request.session["username"] = user.get_username()

    user_data = User.objects.get(username = request.session["username"])
    user_serialized = UserSerializer(user_data , many=False)

    if(user is not None):
        login(request, user)
        return(Response({"Status":"Login Succesfull.","username":username_form,"password":password_form,"Authenticated":request.user.is_authenticated,"user_data":user_serialized.data}))

    else:
        return(Response({"Status":"Invalid Username or Password","username":username_form,"password":password_form,"user_data":user_serialized.data}))
    
@api_view(['POST','GET'])
def logout_user(request):
    logout(request)
    return(Response("User Logged Out "))

#TODO: Şimdilik @login_required ve request.session kullanarak git. (veya request.session lengthe göre anla) request.user'da bug var, bi ara düzelt. (request.session datası güzel taşınıyo olmasına rağmen request.user AnonymousUser olarak dönüyo)

@api_view(['POST', 'GET'])
def check_auth(request):
        if(len(request.session.keys()) != 0):
            return Response({"Message": "User Authenticated","user-id":request.session["_auth_user_id"],"session-data":request.session})
        else:
            return Response({"Message": "Authentication failed","session-data":request.session})
        
@api_view(['POST','GET'])
def checkLangServe(request):

    send_query = "hızlıgo nedir"

    if request.method == "POST":
        send_query = request.data["prompt"]
    
    test_data = {
                "input": {
                    "query": send_query
                },
                "config": {},
                "kwargs": {}
                }
    response = requests.post('http://172.17.45.102:8080/invoke',json=test_data)
    content = response.json()
    print(type(content))
    return Response(content["output"])

@api_view(['POST','GET'])
def countToken(request):
    input = "Türk cumhuriyetinin kurucusu kimdir"
    output = "Türk Cumhuriyeti’nin Kurucusu Mustafa Kemal Atatürk."

    encoding = tiktoken.get_encoding("cl100k_base")

    token_input_integers = encoding.encode(input)
    token_output_integers = encoding.encode(output)

    token_input_bytes = [encoding.decode_single_token_bytes(token) for token in token_input_integers]
    token_output_bytes = [encoding.decode_single_token_bytes(token) for token in token_output_integers]

    num_input_tokens = len(encoding.encode(input))
    num_output_tokens = len(encoding.encode(output))


    return Response({"input_token_count":num_input_tokens,"output_token_count":num_output_tokens,"input_tokens":token_input_bytes,"output_tokens":token_output_bytes})


    
# @api_view(['POST','GET'])
# def session_test(request):
#     request.session["a"] = "a"
#     request.session["b"] = "b"
#     request.session["c"] = "c"

#     request.session.modified = True
#     request.session.save()

#     return(Response(request.session))
        
# Create your views here.


