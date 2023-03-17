from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import random

def generate_key():
    key = str(random.randint(1000, 9999))
   
    return key


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    key = models.CharField(max_length=4, default=generate_key)
    created_at = models.DateTimeField(default=timezone.now)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True, default="avatars/def_avatar.png")
    full_username = models.CharField(max_length=255, blank=True)
    games_played = models.IntegerField(null=True, blank=True, default=0)
    score = models.IntegerField(null=True, blank=True, default=0)
    def __str__(self):
        return self.full_username or f"{self.user.username}#{self.key}"

    def save(self, *args, **kwargs):
        self.full_username = f"{self.user.username}#{self.key}"
        super().save(*args, **kwargs)


