from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from base.models import UserSacco
from base.serializers import UserSaccoSerializer
from base.serializers.authenticated_user_serializer import AuthenticatedUserSerializer


class AuthenticatedUserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        return Response(
            AuthenticatedUserSerializer(request.user, context={'request': request}).data, status=200
        )

