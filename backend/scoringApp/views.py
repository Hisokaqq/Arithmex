from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Game
from django.contrib.auth.models import User
from .serializers import GameSerialize
from django.db.models import Q

@api_view(["GET"])
def get_yourGames(request):
    user = request.user
    games = Game.objects.filter(Q(player1=user) | Q(player2=user))
    serializer = GameSerialize(games, many=True)
    return Response(serializer.data)