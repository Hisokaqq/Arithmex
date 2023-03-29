from rest_framework import serializers
from .models import Game
class GameSerialize(serializers.ModelSerializer):
    player1_fullname = serializers.CharField(source='player1.profile.full_username')
    player1_avatar = serializers.ImageField(source='player1.profile.avatar')
    player2_fullname = serializers.CharField(source='player2.profile.full_username')
    player2_avatar = serializers.ImageField(source='player2.profile.avatar')

    class Meta:
        model = Game
        fields = "__all__"
   