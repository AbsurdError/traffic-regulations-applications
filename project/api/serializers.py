from rest_framework import serializers
from .models import *

class LoginSerializer(serializers.Serializer):
    login = serializers.CharField()
    password = serializers.CharField()

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['login', 'fio', 'email', 'phone', 'password']

    def save(self, **kwargs):
        user = User(
            login=self.validated_data['login'],
            fio=self.validated_data['fio'],
            email=self.validated_data['email'],
            phone=self.validated_data['phone'],
            username=self.validated_data['login'],
        )
        user.set_password(self.validated_data['password'])
        user.save()
        return user

class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['fio']

class ApplicationSerializer(serializers.ModelSerializer):
    status = StatusSerializer()
    class Meta:
        model = Applications
        fields = ['id', 'name', 'auto_num', 'description', 'status']

class ApplicationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Applications
        fields = ['name', 'auto_num', 'description']

class ApplicationSerializerForAdmin(serializers.ModelSerializer):
    status = StatusSerializer()
    user = UserSerializer()
    class Meta:
        model = Applications
        fields = ['id', 'name', 'auto_num', 'description', 'status', 'user']

class ApplicationChangeSerializerForAdmin(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Applications
        fields = ['id', 'name', 'auto_num', 'description', 'status', 'user']
