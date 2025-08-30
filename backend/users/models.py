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


@receiver(post_migrate)
def create_dummy_users(sender, **kwargs):
    if sender.name == "users":  # only when our app migrates
        from django.contrib.auth.models import User
        from .models import Provider, Client

        if not User.objects.filter(username="sam_plumber").exists():
            u1 = User.objects.create_user("sam_plumber", password="pass1234")
            u2 = User.objects.create_user("ellie_sparks", password="pass1234")
            u3 = User.objects.create_user("mike_home", password="pass1234")
            u4 = User.objects.create_user("lana_rent", password="pass1234")
            u5 = User.objects.create_user("ben_biz", password="pass1234")

            Provider.objects.create(
                user=u1,
                trade="Plumber",
                skills="leak repair,pipes",
                hourly_rate=95.0,
                rating=4.8,
                city="Sydney",
            )
            Provider.objects.create(
                user=u2,
                trade="Electrician",
                skills="wiring,lighting",
                hourly_rate=110.0,
                rating=4.9,
                city="Sydney",
            )

            Client.objects.create(user=u3, city="Sydney", phone="+61 400 111 111")
            Client.objects.create(user=u4, city="Sydney", phone="+61 400 222 222")
            Client.objects.create(user=u5, city="Sydney", phone="+61 400 333 333")
