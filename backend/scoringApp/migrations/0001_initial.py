# Generated by Django 4.1.7 on 2023-03-29 08:07

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('loser', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='loser', to=settings.AUTH_USER_MODEL)),
                ('player1', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='player2', to=settings.AUTH_USER_MODEL)),
                ('winner', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='winner', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]