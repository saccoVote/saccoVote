from rest_framework import serializers

from base.models import Election


class ElectionResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Election
        fields = '__all__'
