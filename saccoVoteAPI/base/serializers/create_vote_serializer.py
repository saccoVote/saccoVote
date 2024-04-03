from rest_framework import serializers

from base.models.vote import Vote


class CreateVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = ['candidate']
