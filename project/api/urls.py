from .views import *
from django.urls import path

urlpatterns = [
    path('login', login),
    path('signup', registration),
    path('logout', logout),
    path('applications', getApps),
    path('application', createApps),
    path('application/<int:pk>', changeApps),
    path('admin', getAppsForAdmin),
    path('admin/<int:pk>', changeAppsForAdmin),
]
