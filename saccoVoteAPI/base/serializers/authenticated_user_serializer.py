from rest_framework import serializers

from base.models import CustomUser
from base.serializers import UserSaccoSerializer


class AuthenticatedUserSerializer(serializers.ModelSerializer):
    user_saccos = UserSaccoSerializer(source='usersacco_set', many=True, read_only=True)

    class Meta:
        model = CustomUser
        fields = ['email', 'first_name', 'last_name', 'user_saccos']
