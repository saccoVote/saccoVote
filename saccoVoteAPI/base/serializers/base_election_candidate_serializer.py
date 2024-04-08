from rest_framework import serializers

from base.models import ElectionCandidate, SaccoUser
from base.models.vetting import Vetting


class BaseElectionCandidateSerializer(serializers.ModelSerializer):
    is_approved = serializers.SerializerMethodField()
    vetting_status_by_authenticated_user = serializers.SerializerMethodField()

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

    def get_vetting_status_by_authenticated_user(self, obj):
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            # Check if the request.user is associated with a SaccoUser instance
            try:
                sacco_user = SaccoUser.objects.get(user=request.user)
            except SaccoUser.DoesNotExist:
                return False

            # Check if the authenticated SaccoUser has vetted this candidate
            vetting_status = Vetting.objects.filter(
                vetter=sacco_user,
                candidate=obj,  # Assuming `obj` is an ElectionCandidate instance linked to a SaccoUser
                election=obj.election  # Assuming `obj` is linked to an Election instance
            )

            return None if not vetting_status.exists() else vetting_status.first().approved
        return False
