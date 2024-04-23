from django.db import models
from datetime import timedelta

# Create your models here.

class User(models.Model):
    user_hash = models.CharField(max_length=64, primary_key=True, unique=True, default='')
    email = models.EmailField(unique=True)
    password_hash = models.CharField(max_length=64)
    gender = models.CharField(max_length=20)
    birthdate = models.DateField()
    spent_time = models.DurationField(default=timedelta(0))

    def __str__(self):
        return self.name