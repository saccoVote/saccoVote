from rest_framework import serializers

from base.models import UserSacco
from base.serializers import SaccoSerializer


class UserSaccoSerializer(serializers.ModelSerializer):
    sacco_name = serializers.CharField(source='sacco.name', read_only=True)
    sacco_logo = serializers.CharField(source='sacco.logo', read_only=True)

    class Meta:
        model = UserSacco
        fields = ['sacco_name', 'sacco_logo', 'role', 'created_at', 'is_vetter']
