from rest_framework import serializers
#from api.models import User
from api.models import Chat
from api.models import Message
from api.models import ApiKey
from api.models import BlobField
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate


class BlobSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlobField
        fields = '__all__'
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = '__all__'

class ApiKeySerializer(serializers.ModelSerializer):
    class Meta:
        model = ApiKey
        fields = '__all__'

class TokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['name'] = user.username
        token['email'] = user.email

        return token
    
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, 
        required=True, 
        validators=[validate_password]
        )
    
    password_again = serializers.CharField(
        write_only=True, 
        required=True, 
        )
    
    class Meta:
        model = User
        fields = ('username','password','password_again','email')

    def create(self, validated_data):
            user = User.objects.create(
                username = validated_data['username'],
                email = validated_data['email']
            )

            user.set_password(validated_data['password'])
            user.save()

            return user
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password_again']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    def validate(self, attrs):
        user = authenticate(username=attrs['username'], 
        password=attrs['password'])
        if not user:
            raise serializers.ValidationError('Incorrect username or password.')
        if not user.is_active:
            raise serializers.ValidationError('User is disabled.')
        return {'user': user}

    
