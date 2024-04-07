from rest_framework import serializers

from base.models import Sacco


class SaccoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sacco
        fields = '__all__'
