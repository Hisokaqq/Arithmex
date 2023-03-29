from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/searching_lobby/', consumers.SearchingLobbyConsumer.as_asgi()),
]
