from rest_framework import serializers

from base.models import CustomUser, Sacco, UserSacco


class CreateUserSaccoSerializer(serializers.Serializer):
    """
    Serializer for creating new saccos and adding an admin user
    """
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    sacco_name = serializers.CharField(max_length=100)

    def create(self, validated_data):
        user = CustomUser.objects.filter(email=validated_data['email']).first()

        if not user:
            user = CustomUser.objects.create_user(
                email=validated_data['email'],
                password=validated_data['password'],
            )

        sacco = Sacco.objects.create(name=validated_data['sacco_name'])

        user_sacco = UserSacco.objects.create(user=user, sacco=sacco, role='admin')
        return user_sacco
