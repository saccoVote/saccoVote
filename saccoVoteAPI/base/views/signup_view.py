from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from base.models import CustomUser, Sacco, SaccoUser
from base.serializers import SignupSerializer
from base.utils.send_email import send_email


class SignupView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = CustomUser.objects.filter(email=request.data.get('email')).first()

            if not user:
                user = CustomUser.objects.create_user(
                    email=request.data.get('email'),
                    password=request.data.get('password'),
                )

            sacco = Sacco.objects.create(name=request.data.get('sacco_name'))
            sacco_user = SaccoUser.objects.create(user=user, sacco=sacco, role='admin')

            #TODO: Update email template design
            send_email('Welcome to saccoVote', [request.data.get('email')], 'welcome',
                       context={
                            'sacco_name': request.data.get('sacco_name'),
                            'email': request.data.get('email'),
                       })
            return Response({'message': 'Sacco created successfully!',
                             'sacco_id': sacco.id, 'user_id': user.id, 'sacco_user_id': sacco_user.id},
                            status=201)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
