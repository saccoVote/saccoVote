from django.utils import timezone
from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.mixins import CreateModelMixin, ListModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from base.custom_permissions import IsSaccoMember
from base.models import ElectionCandidate, Election, VoteActivity, SaccoUser
from base.models.vote import Vote
from base.serializers import VoteSerializer, CreateVoteSerializer, ElectionCandidateSerializer

from django.db import transaction


class VoteViewSet(CreateModelMixin, ListModelMixin, GenericViewSet):
    queryset = None
    serializer_class = VoteSerializer
    permission_classes = [IsAuthenticated, IsSaccoMember]

    def get_queryset(self):
        return Vote.objects.filter(
            election_id=self.kwargs.get('election_pk'),
            election__sacco_id=self.kwargs.get('sacco_pk'),
            election__end_date__lt=timezone.now()
        )

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateVoteSerializer
        return VoteSerializer

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        request.data['election'] = self.kwargs.get('election_pk')
        # serializer = VoteSerializer(data=request.data)
        if request.data.get('candidate'):
            voter = get_object_or_404(SaccoUser, user=request.user)
            election = get_object_or_404(Election, pk=self.kwargs.get('election_pk'))
            candidate = get_object_or_404(ElectionCandidate, pk=request.data.get('candidate'))
            user_has_voted = VoteActivity.objects.filter(voter__user__id=request.user.id, election=election).exists()
            if user_has_voted:
                return Response({'error': 'User has already voted in this election'}, status=status.HTTP_409_CONFLICT)
            if election.is_ongoing():
                if ElectionCandidateSerializer(candidate, context={'request': request}).get_is_approved(candidate):
                    VoteActivity.objects.create(election=election, voter=voter)
                    Vote.objects.create(election=election, candidate=candidate)
                    return Response({'message': 'Vote successful'}, status=status.HTTP_201_CREATED)
                return Response({'error': 'Candidate is not vetted for this election'},
                                status=status.HTTP_422_UNPROCESSABLE_ENTITY)
            return Response({'error': 'Election is not ongoing'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        return Response({'error': 'unable to vote'}, status=status.HTTP_400_BAD_REQUEST)

