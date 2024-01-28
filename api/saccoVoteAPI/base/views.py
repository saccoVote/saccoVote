from django.shortcuts import render

# Create your views here.

from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView

from base.serializers import GroupSerializer, UserSerializer, SaccoSerializer, CreateUserSaccoSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    # TODO: limit these endpoints to super admins
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    # TODO: limit these endpoints to super admins
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class CreateSaccoView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = CreateUserSaccoSerializer(data=request.data)
        if serializer.is_valid():
            user_sacco = serializer.save()
            return Response({'message': 'Sacco created successfully!', 'id': user_sacco.id},
                            status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)