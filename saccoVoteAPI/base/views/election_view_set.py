from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from base.custom_permissions import IsSaccoAdmin
from base.models import Election
from base.serializers import ElectionRequestSerializer, ElectionResponseSerializer, ElectionSerializer


class ElectionViewSet(viewsets.ModelViewSet):
    queryset = Election.objects.none()
    serializer_class = None
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Election.objects.filter(sacco=self.kwargs['sacco_pk'])

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return ElectionRequestSerializer
        elif self.action == 'destroy':
            return None
        else:
            return ElectionResponseSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAuthenticated, IsSaccoAdmin]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        request.data['sacco'] = self.kwargs['sacco_pk']
        serializer = ElectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Election created', 'id': serializer.data['id']}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
