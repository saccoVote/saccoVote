from rest_framework import serializers

from base.models import ElectionCandidate, SaccoUser
from base.models.vetting import Vetting


class BaseElectionCandidateSerializer(serializers.ModelSerializer):
    is_approved = serializers.SerializerMethodField()

    class Meta:
        abstract = True
        model = ElectionCandidate

    def get_is_approved(self, obj):
        request = self.context.get('request')
        sacco_pk = request.parser_context['kwargs']['sacco_pk']

        total_vetters = SaccoUser.objects.filter(sacco_id=sacco_pk, is_vetter=True).count()
        approved_vetters = Vetting.objects.filter(candidate_id=obj.id, approved=True).count()
        approval_percentage = (approved_vetters / total_vetters) * 100

        return approval_percentage >= 51
