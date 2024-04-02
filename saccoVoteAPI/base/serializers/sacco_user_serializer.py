from rest_framework import serializers

from base.models import SaccoUser


class SaccoUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = SaccoUser
        fields = '__all__'
