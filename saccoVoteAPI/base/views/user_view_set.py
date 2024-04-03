from rest_framework import viewsets, permissions

from base.models import CustomUser
from base.serializers import CustomUserSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    # TODO: limit these endpoints to super admins
    queryset = CustomUser.objects.all().order_by('-date_joined')
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated]
