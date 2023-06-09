# Generated by Django 4.1.7 on 2023-03-17 10:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import profileApp.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.CharField(default=profileApp.models.generate_key, max_length=10, unique=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('avatar', models.ImageField(blank=True, null=True, upload_to='avatars/')),
                ('full_username', models.CharField(blank=True, max_length=255)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
