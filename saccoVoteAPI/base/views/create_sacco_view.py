from rest_framework.response import Response
from rest_framework.views import APIView

from base.serializers import CreateUserSaccoSerializer


class CreateSaccoView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = CreateUserSaccoSerializer(data=request.data)
        if serializer.is_valid():
            user_sacco = serializer.save()
            return Response({'message': 'Sacco created successfully!', 'id': user_sacco.id},
                            status=201)
        return Response(serializer.errors, status=400)
