from rest_framework import serializers

from base.models import ElectionCandidate
from base.serializers.base_election_candidate_serializer import BaseElectionCandidateSerializer


class ElectionCandidateSerializer(BaseElectionCandidateSerializer):
    fullname = serializers.CharField(source='sacco_user.fullname', read_only=True)

    class Meta:
        fields = '__all__'
        model = ElectionCandidate
