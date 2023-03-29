from django.urls import path
from . import views

urlpatterns = [
    path("yours/", views.get_yourGames, name="your games")
]