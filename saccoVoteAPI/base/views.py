from django.shortcuts import render

# Create your views here.

from django.contrib.auth.models import Group
from rest_framework import permissions, viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from base.models import CustomUser
from base.serializers import GroupSerializer, CustomUserSerializer, SaccoSerializer, CreateUserSaccoSerializer, \
    CustomAuthTokenSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    # TODO: limit these endpoints to super admins
    queryset = CustomUser.objects.all().order_by('-date_joined')
    serializer_class = CustomUserSerializer
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


class CustomObtainAuthToken(ObtainAuthToken):
    serializer_class = CustomAuthTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})


class CheckUserView(APIView):
    def get(self, request, *args, **kwargs):
        email_to_check = kwargs.get('email')
        user = None
        try:
            user = CustomUser.objects.get(email=email_to_check)
        finally:
            if user is not None and user.is_active:
                return Response({'message': 'User is active'}, status=status.HTTP_200_OK)
            return Response({'message': 'User does not exist'}, status=404)
