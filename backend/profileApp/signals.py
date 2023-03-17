from django.db.models.signals import post_save, pre_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import Profile


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(pre_save, sender=User)
def update_profile_full_username(sender, instance, **kwargs):
    if instance.pk:
        try:
            profile = Profile.objects.get(user=instance)
            new_full_username = f"{instance.username}#{profile.key}"
            profile.full_username = new_full_username
            profile.save()
        except Profile.DoesNotExist:
            pass
