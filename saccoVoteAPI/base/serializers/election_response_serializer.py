from rest_framework import serializers

from base.models import Election, SaccoUser, VoteActivity


class ElectionResponseSerializer(serializers.ModelSerializer):
    authenticated_user_has_voted = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Election
        fields = '__all__'

    def get_authenticated_user_has_voted(self, obj):
        """
        Checks if the authenticated user has already voted in the election.
        """
        request = self.context.get('request')
        if request and request.user and request.user.is_authenticated:
            # Assuming `request.user` can be directly mapped to a `SaccoUser`.
            # You might need to adjust this logic depending on how your user model is related to SaccoUser.
            try:
                sacco_user = SaccoUser.objects.get(user=request.user)
                return VoteActivity.objects.filter(voter=sacco_user, election=obj).exists()
            except SaccoUser.DoesNotExist:
                return False
        return False
