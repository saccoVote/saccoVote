import secrets
import string

from django.db import IntegrityError
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from base.custom_permissions import IsSaccoAdmin
from base.models import SaccoUser, CustomUser, Sacco
from base.serializers import SaccoUserRequestSerializer, SaccoUserResponseSerializer, SaccoUserSerializer
from base.utils.send_email import send_email


class SaccoUserViewSet(viewsets.ModelViewSet):
    queryset = SaccoUser.objects.none()
    serializer_class = None
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return SaccoUser.objects.filter(sacco=self.kwargs['sacco_pk'])

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return SaccoUserRequestSerializer
        elif self.action == 'destroy':
            return None
        else:
            return SaccoUserResponseSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAuthenticated, IsSaccoAdmin]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        user = CustomUser.objects.filter(email=self.request.data['email']).first()
        password = ''

        if not user:
            # Generate random password for new user
            alphabet = string.ascii_letters + string.digits + string.punctuation
            password = ''.join(secrets.choice(alphabet) for i in range(12))
            user = CustomUser.objects.create_user(
                email=self.request.data['email'],
                password=password,
            )

        request.data['sacco'] = self.kwargs['sacco_pk']
        request.data['user'] = user.id
        serializer = SaccoUserSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
            except IntegrityError:
                return Response({'error': 'Sacco User already exists'}, status=status.HTTP_409_CONFLICT)
            send_email(
                "You've been added as {role} of {sacco_name} in saccoVote"
                .format(
                    role='an admin and vetter' if request.data.get('role') == 'admin' and request.data.get('is_vetter')
                    else ('an admin' if request.data.get('role') == 'admin'
                          else 'a ' + request.data.get('role', 'member')),
                    sacco_name=Sacco.objects.filter(id=serializer.data.get('sacco')).first().name),
                [request.data.get('email')], 'new-sacco-member',
                context={
                    'sacco_name': Sacco.objects.filter(id=serializer.data.get('sacco')).first().name,
                    'email': request.data.get('email'),
                    'fullname': request.data.get('fullname'),
                    'password': password
                })
            return Response({'message': 'Member added', 'id': user.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        sacco_user = SaccoUser.objects.filter(
            sacco=self.kwargs['sacco_pk'], id=self.kwargs['pk'])
        if sacco_user:
            sacco_user.delete()
            # TODO: send an email - delete activity
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(
            {'message': 'Member with id {id} was not found'.format(id=self.kwargs['pk'])},
            status=status.HTTP_404_NOT_FOUND)
