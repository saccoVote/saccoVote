from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from base.custom_permissions import IsSaccoAdmin, IsSaccoMember
from base.models import Sacco, SaccoUser
from base.serializers import SaccoSerializer, UserSaccoResponseSerializer


class SaccoViewSet(viewsets.ModelViewSet):
    """
    API endpoints that allows get all, get one, create, update, delete sacco
    GET: sacco members and admins
    POST: existing users
    PUT,PATCH,DELETE: only sacco admins
    """
    queryset = SaccoUser.objects.none()
    serializer_class = UserSaccoResponseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self, *args, **kwargs):
        return SaccoUser.objects.filter(user=self.request.user)
    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return UserSaccoResponseSerializer
        return SaccoSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAuthenticated, IsSaccoAdmin]
        else:
            permission_classes = [IsAuthenticated, IsSaccoMember]
        return [permission() for permission in permission_classes]

    def retrieve(self, request, *args, **kwargs):
        instance = SaccoUser.objects.filter(
            user=self.request.user, sacco_id=kwargs.get('pk')).first()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    def update(self, request, *args, **kwargs):
        # TODO:
        pass
    def partial_update(self, request, *args, **kwargs):
        # TODO:
        pass
    def destroy(self, request, *args, **kwargs):
        # TODO:
        pass
