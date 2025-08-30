from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_migrate
from django.dispatch import receiver


class Client(models.Model):
    username = models.OneToOneField(User, on_delete=models.CASCADE, related_name="client")
    password = models.CharField(max_length=80, blank=True)
    customer_name = models.CharField(max_length=80, blank=True)
    customer_id = models.CharField(max_length=80, blank=True)
    
    def __str__(self):
        return self.user.username
