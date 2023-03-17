from .models import Profile
from django.db.models.signals import post_save, post_delete
from django.contrib.auth.models import User
from .serializers import ProfileSerializer
def createProfile(sender, instance, created, **kwargs):
    if created:
        user = instance
        Profile.objects.create(user=user)

           

def updateProfile(sender, instance, created, **kwargs):
    if created==False:
        user = instance
        profile = Profile.objects.get(user=user)
        new_full_username = f"{instance.username}#{profile.key}"
        profile.full_username = new_full_username
        
        
        profile.save()



post_save.connect(createProfile, sender=User)
post_save.connect(updateProfile, sender=User)

