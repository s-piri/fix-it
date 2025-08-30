from django.db import models
from django.contrib.auth.models import AbstractUser

class Client(AbstractUser):
    customer_id = models.CharField(max_length=80, blank=True, unique=True)
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.username} ({self.customer_id})"
    
    class Meta:
        ordering = ['-date_joined']
