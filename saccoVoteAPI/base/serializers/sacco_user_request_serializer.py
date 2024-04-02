from rest_framework import serializers

from base.models import SaccoUser


class SaccoUserRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = SaccoUser
        fields = ['fullname', 'member_id', 'role', 'position', 'is_vetter', 'member_since']
