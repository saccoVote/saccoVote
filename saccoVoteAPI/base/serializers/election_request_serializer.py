from rest_framework import serializers

from base.models import Election


class ElectionRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Election
        fields = ['title', 'start_date', 'end_date']
