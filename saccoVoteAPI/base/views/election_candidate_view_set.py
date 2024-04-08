from django.db import IntegrityError
from rest_framework import viewsets, status
from rest_framework.generics import get_object_or_404
from rest_framework.mixins import CreateModelMixin, DestroyModelMixin, ListModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from base.custom_permissions import IsSaccoMemberOnly
from base.models import ElectionCandidate, SaccoUser, Election
from base.serializers import ElectionCandidateSerializer


class ElectionCandidateViewSet(CreateModelMixin, ListModelMixin, DestroyModelMixin, GenericViewSet):
    queryset = None
    serializer_class = ElectionCandidateSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ElectionCandidate.objects.filter(
            election__sacco_id=self.kwargs.get('sacco_pk'),
            election_id=self.kwargs.get('election_pk'))

    def get_serializer_class(self):
        if self.action in ['create', 'destroy']:
            return None
        else:
            return ElectionCandidateSerializer

    def get_permissions(self):
        if self.action in ['create', 'destroy']:
            permission_classes = [IsAuthenticated, IsSaccoMemberOnly]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        sacco_user = get_object_or_404(SaccoUser, user=request.user, sacco_id=kwargs.get('sacco_pk'))
        election = get_object_or_404(Election, pk=kwargs.get('election_pk'), sacco_id=kwargs.get('sacco_pk'))
        serializer = ElectionCandidateSerializer(data={'sacco_user': sacco_user.pk, 'election': election.pk})
        if serializer.is_valid():
            try:
                serializer.save()
            except IntegrityError:
                return Response({'error': 'Already applied to be a candidate in this election'},
                                status=status.HTTP_409_CONFLICT)
            return Response({'message': 'candidacy application successful'},
                            status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
