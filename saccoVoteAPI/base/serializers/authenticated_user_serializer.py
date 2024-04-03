from rest_framework import serializers

from base.models import CustomUser
from base.serializers import UserSaccoResponseSerializer


class AuthenticatedUserSerializer(serializers.ModelSerializer):
    user_saccos = UserSaccoResponseSerializer(source='saccouser_set', many=True, read_only=True)

    class Meta:
        model = CustomUser
        fields = ['email', 'firstname', 'lastname', 'user_saccos']
