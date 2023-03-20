from django.urls import path
from . import views


urlpatterns = [
    path('list/', views.profile_list, name="profiles list"),
    path('scoring/', views.scoring, name="profiles list"),
    path('refresh/', views.refreshUser, name="refresh user"),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('update/', views.update_user, name='updating'),
    path('register/', views.registerUser, name='register'),
    path("add_score/", views.add_score, name="score adding"),
    path("add_game/", views.add_game, name="game adding"),

]
