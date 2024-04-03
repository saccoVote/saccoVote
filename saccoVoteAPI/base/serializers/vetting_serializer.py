from rest_framework import serializers

from base.models.vetting import Vetting


class VettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vetting
        fields = '__all__'
