from django.contrib.auth.models import Group
from rest_framework import viewsets, permissions

from base.serializers import GroupSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    # TODO: limit these endpoints to super admins
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]
