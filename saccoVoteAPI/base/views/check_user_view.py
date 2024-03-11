from rest_framework.response import Response
from rest_framework.views import APIView

from base.models import CustomUser


class CheckUserView(APIView):
    def get(self, request, *args, **kwargs):
        email_to_check = kwargs.get('email')
        user = None
        try:
            user = CustomUser.objects.get(email=email_to_check)
        finally:
            if user is not None and user.is_active:
                return Response({'message': 'User is active'}, status=200)
            return Response({'message': 'User does not exist'}, status=404)
