from rest_framework.response import Response
from rest_framework.views import APIView

from base.serializers import CreateUserSaccoSerializer
from base.utils.send_email import send_email


class CreateUserSaccoView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = CreateUserSaccoSerializer(data=request.data)
        if serializer.is_valid():
            user_sacco = serializer.save()
            #TODO: Update email template design
            send_email('Welcome to saccoVote', [request.data.get('email')], 'welcome',
                       context={
                            'sacco_name': request.data.get('sacco_name'),
                            'email': request.data.get('email'),
                       })
            return Response({'message': 'Sacco created successfully!', 'id': user_sacco.id},
                            status=201)
        return Response(serializer.errors, status=400)
