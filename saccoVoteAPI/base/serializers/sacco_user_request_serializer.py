from rest_framework import serializers

from base.models import SaccoUser


class SaccoUserRequestSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = SaccoUser
        fields = ['email', 'fullname', 'member_id', 'role', 'position', 'is_vetter', 'member_since']
