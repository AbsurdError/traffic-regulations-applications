from django.shortcuts import render
from .serializers import *
from .models import *
from .permissions import IsClient
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_403_FORBIDDEN, HTTP_201_CREATED, HTTP_404_NOT_FOUND, HTTP_401_UNAUTHORIZED, HTTP_422_UNPROCESSABLE_ENTITY
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
# Create your views here.

@api_view(['POST'])
def login(request):
    user_ser = LoginSerializer(data=request.data)
    if user_ser.is_valid():
        try:
            user = User.objects.get(login=user_ser.validated_data['login'])
            if not user.check_password(user_ser.validated_data['password']):
                return Response({'error': {'code': 401, 'message': 'Authenticated failed'}},
                                status=HTTP_401_UNAUTHORIZED)
        except:
            return Response({'error': {'code': 401, 'message': 'Authenticated failed'}}, status=HTTP_401_UNAUTHORIZED)
        isAdmin = False
        if user.is_staff:
            isAdmin = True
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'data': {'user_token': token.key, 'isAdmin': isAdmin}}, status=HTTP_200_OK)
    return Response({'error': {'code': 422, 'message': 'Validation error', 'errors': user_ser.errors}}, status=HTTP_422_UNPROCESSABLE_ENTITY)

@api_view(['POST'])
def registration(request):
    user_ser = RegistrationSerializer(data=request.data)
    if user_ser.is_valid():
        user = user_ser.save()
        isAdmin = False
        if user.is_staff:
            isAdmin = True
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'data': {'user_token': token.key, 'isAdmin': isAdmin}}, status=HTTP_201_CREATED)
    return Response({'error': {'code': 422, 'message': 'Validation error', 'errors': user_ser.errors}}, status=HTTP_422_UNPROCESSABLE_ENTITY)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def logout(request):
    request.user.auth_token.delete()
    return Response({'data': {'message': 'logout'}}, status=HTTP_200_OK)


@api_view(['GET'])
def getApps(request):
    if request.user.is_staff:
        return Response({'error': {'code': 403, 'message': 'Forbidden for you '}},
                        status=HTTP_403_FORBIDDEN)
    elif request.user.is_authenticated:
        apps = Applications.objects.filter(user=request.user)
    else:
        apps = Applications.objects.all()
    app_ser = ApplicationSerializer(apps, many=True)
    apps = []
    for app in app_ser.data:
        newApps = {
            'id': app['id'],
            'name': app['name'],
            'auto_num': app['auto_num'],
            'description': app['description'],
            'status': app['status']['name'],
        }
        apps.append(newApps)
    return Response({'data': apps}, status=HTTP_200_OK)



@api_view(['POST'])
@permission_classes([IsClient])
def createApps(request):
    app_ser = ApplicationCreateSerializer(data=request.data)
    if app_ser.is_valid():
        Applications.objects.create(name=app_ser.validated_data['name'],
                                    auto_num=app_ser.validated_data['auto_num'],
                                    description=app_ser.validated_data['description'],
                                    user=request.user)
        return Response({'data': {'message': 'App was added'}}, status=HTTP_201_CREATED)
    return Response({'error': {'code': 422, 'message': 'Validation error', 'errors': app_ser.errors}}, status=HTTP_422_UNPROCESSABLE_ENTITY)

@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([IsClient])
def changeApps(request, pk):
    try:
        app = Applications.objects.get(pk=pk, user=request.user)
    except:
        return Response({'error': {'code': 403, 'message': 'Forbidden for you'}}, status=HTTP_403_FORBIDDEN)
    if request.method == 'GET':
        app_ser = ApplicationSerializer(app)
        app = app_ser.data
        newApp = {
            'id': app['id'],
            'name': app['name'],
            'auto_num': app['auto_num'],
            'description': app['description'],
            'status': app['status']['name'],
        }
        return Response({'data': newApp}, status=HTTP_200_OK)
    elif request.method == 'DELETE':
        app.delete()
        return Response({'data': {'message': 'App was removed'}}, status=HTTP_200_OK)
    elif request.method == 'PATCH':
        app_ser = ApplicationSerializer(data=request.data, instance=app, partial=True)
        if app_ser.is_valid():
            app_ser.save()
            app = app_ser.data
            newApp = {
                'id': app['id'],
                'name': app['name'],
                'auto_num': app['auto_num'],
                'description': app['description'],
                'status': app['status']['name'],
            }
            return Response({'data': newApp}, status=HTTP_200_OK)
        return Response({'error': {'code': 422, 'message': 'Validation error', 'errors': app_ser.errors}}, status=HTTP_422_UNPROCESSABLE_ENTITY)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAppsForAdmin(request):
    apps = Applications.objects.all()
    app_ser = ApplicationSerializerForAdmin(apps, many=True)
    apps = []
    for app in app_ser.data:
        newApps = {
            'id': app['id'],
            'name': app['name'],
            'user': app['user']['fio'],
            'auto_num': app['auto_num'],
            'description': app['description'],
            'status': app['status']['name'],
        }
        apps.append(newApps)
    return Response({'data': apps}, status=HTTP_200_OK)

@api_view(['PATCH', 'DELETE'])
@permission_classes([IsAdminUser])
def changeAppsForAdmin(request, pk):
    try:
        app = Applications.objects.get(pk=pk)
    except:
        return Response({'error': {'code': 404, 'message': 'Not found'}}, status=HTTP_404_NOT_FOUND)
    if request.method == 'DELETE':
        app.delete()
        return Response({'data': {'message': 'App was removed'}}, status=HTTP_200_OK)
    elif request.method == 'PATCH':
        app_ser = ApplicationChangeSerializerForAdmin(data=request.data, instance=app, partial=True)
        if app_ser.is_valid():
            app_ser.save()
            app = app_ser.data
            newApp = {
                'id': app['id'],
                'name': app['name'],
                'user': app['user']['fio'],
                'auto_num': app['auto_num'],
                'description': app['description'],
                'status': Status.objects.get(pk=request.data['status']).name,
            }
            return Response({'data': newApp}, status=HTTP_200_OK)
        return Response({'error': {'code': 422, 'message': 'Validation error', 'errors': app_ser.errors}}, status=HTTP_422_UNPROCESSABLE_ENTITY)



