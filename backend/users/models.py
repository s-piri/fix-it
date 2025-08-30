from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_migrate
from django.dispatch import receiver


class Provider(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="provider")
    trade = models.CharField(max_length=50)  # e.g. "Plumber"
    skills = models.CharField(max_length=200)  # "pipes, drains"
    hourly_rate = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=5.0)
    city = models.CharField(max_length=80, blank=True)

    def __str__(self):
        return f"{self.user.username} ({self.trade})"


class Client(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="client")
    city = models.CharField(max_length=80, blank=True)
    phone = models.CharField(max_length=30, blank=True)

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
