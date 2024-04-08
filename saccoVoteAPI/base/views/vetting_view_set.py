from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from base.custom_permissions import IsSaccoVetter
from base.models import SaccoUser, Election, ElectionCandidate
from base.models.vetting import Vetting
from base.serializers import CreateVettingSerializer, VettingSerializer


class VettingViewSet(CreateModelMixin, GenericViewSet):
    queryset = None
    serializer_class = CreateVettingSerializer
    permission_classes = [IsAuthenticated, IsSaccoVetter]

    def create(self, request, *args, **kwargs):
        election = get_object_or_404(Election, pk=kwargs.get('election_pk'), sacco_id=kwargs.get('sacco_pk'))
        if election.has_not_started():
            vetter = get_object_or_404(SaccoUser, user=request.user)
            candidate = get_object_or_404(ElectionCandidate, pk=kwargs.get('candidate_pk'))

            # serializer = VettingSerializer(data={
            #     'vetter': vetter.id,
            #     'candidate': candidate.sacco_user_id,
            #     'election': election.id,
            #     'approved': request.data.get('approved')
            # })
            try:
                Vetting.objects.create(
                    vetter=vetter, candidate=candidate,
                    election=election, approved=request.data.get('approved')
                )
                return Response({'message': 'Candidate Vetted'}, status=status.HTTP_201_CREATED)
            except:
                return Response({'error': 'Unable to vet candidate'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Vetting can only be done on future elections'},
                        status=status.HTTP_422_UNPROCESSABLE_ENTITY)
