from rest_framework import serializers
from .models import Profile
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')

    class Meta:
        model = Profile
        fields = ('key', "full_username", 'avatar', "games_played", "score", "username")


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    isAdmin = serializers.SerializerMethodField(read_only=True)
    # avatar = serializers.CharField(source='profile.avatar')

    class Meta:
        model = User
        fields = [ "profile",  "isAdmin"]
    
   

    def get_isAdmin(self, obj):
        return obj.is_staff

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ["profile",  "isAdmin", "token"]

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


