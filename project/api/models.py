from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinLengthValidator
# Create your models here.


class User(AbstractUser):
    login = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=20, validators=[MinLengthValidator(6)])
    fio = models.CharField(max_length=25)
    email = models.EmailField()
    phone = models.CharField(max_length=15)

    USERNAME_FIELD = 'login'
    REQUIRED_FIELDS = ['fio', 'email', 'phone', 'username', 'password']

class Status(models.Model):
    name = models.CharField(max_length=10)

    def __str__(self):
        return self.name

class Applications(models.Model):
    name = models.CharField(max_length=20)
    auto_num = models.CharField(max_length=11)
    description = models.TextField()
    status = models.ForeignKey(Status, on_delete=models.CASCADE, default=1)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

