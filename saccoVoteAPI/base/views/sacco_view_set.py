from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from base.models import Sacco, UserSacco
from base.serializers import SaccoSerializer, UserSaccoSerializer


class SaccoViewSet(viewsets.ModelViewSet):
    """
    API endpoints that allows get all, get one, create, update, delete sacco
    GET: sacco members and admins
    POST: existing users
    PUT,PATCH,DELETE: only sacco admins
    """
    queryset = UserSacco.objects.none()
    serializer_class = UserSaccoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self, *args, **kwargs):
        return UserSacco.objects.filter(user=self.request.user)

    # def get_serializer_class(self):
    #     pass
    #
    # def get_permissions(self):
    #     pass
