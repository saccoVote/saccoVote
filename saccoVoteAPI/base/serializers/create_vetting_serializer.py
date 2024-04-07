from rest_framework import serializers

from base.models.vetting import Vetting


class CreateVettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vetting
        fields = ['approved']
