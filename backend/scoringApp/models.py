from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Game(models.Model): 
    player1 = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='games_as_player1')
    player2 = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='games_as_player2')
    winner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='games_won')
    loser = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='games_lost')
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.player1.profile.full_username) + " against " + str(self.player2.profile.full_username) 

