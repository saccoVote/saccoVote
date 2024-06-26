from rest_framework import serializers

from base.models import SaccoUser


class UserSaccoResponseSerializer(serializers.ModelSerializer):
    sacco_name = serializers.CharField(source='sacco.name', read_only=True)
    sacco_logo = serializers.CharField(source='sacco.logo', read_only=True)
    sacco_id = serializers.IntegerField(source='sacco.id', read_only=True)

    class Meta:
        model = SaccoUser
        fields = ['id', 'sacco_id', 'sacco_name', 'sacco_logo', 'role', 'created_at', 'is_vetter']
