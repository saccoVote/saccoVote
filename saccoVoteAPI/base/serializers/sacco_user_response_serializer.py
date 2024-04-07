from rest_framework import serializers

from base.models import SaccoUser


class SaccoUserResponseSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = SaccoUser
        fields = '__all__'
