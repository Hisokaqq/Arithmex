# Generated by Django 4.1.7 on 2023-03-17 11:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profileApp', '0003_alter_profile_avatar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='avatar',
            field=models.ImageField(blank=True, default='avatars/def_avatar.png', null=True, upload_to='avatars/'),
        ),
    ]
