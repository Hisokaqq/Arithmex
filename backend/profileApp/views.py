from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from .serializers import ProfileSerializer, UserSerializerWithToken
from .models import Profile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password


@api_view(['GET'])
def profile_list(request):
    profiles = Profile.objects.all()
    serializer = ProfileSerializer(profiles, many=True)
    return Response(serializer.data)


@permission_classes([IsAuthenticated])
@api_view(["PUT", "GET"])
def update_user(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many = False)
    data = request.data
    profile = Profile.objects.get(user=user)
    if (request.method == "PUT"):
        if "avatar" in data:
            if not isinstance(data["avatar"], str) :
                profile.avatar = request.FILES.get("avatar")

        if "username" in data: 
            if data["username"] != user.username and data["username"] != "":
                if not User.objects.filter(username=data["username"]).exists():
                    user.username = data["username"]
                else:
                    message = {"detail": "user with this username already exists"}
                    return Response(message, status=status.HTTP_400_BAD_REQUEST)
        profile.save()
        user.save()

    return Response(serializer.data)





@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def add_score(request):
    user = request.user
    score = request.data["score"]
    
    profile = Profile.objects.get(user=user)
    profile.score += int(score)
    profile.save()
    return Response({"message": f"score added, now your score is {profile.score}"})

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def add_game(request):
    user = request.user
    profile = Profile.objects.get(user=user)
    profile.games_played += 1
    profile.save()
    return Response({"message": f"games played {profile.score}"})






#Register

@api_view(["POST"])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            username = data["username"],
            # email = data["email"],
            password = make_password(data["password"])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {"detail": "user with this username already exists"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    



#Login

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer