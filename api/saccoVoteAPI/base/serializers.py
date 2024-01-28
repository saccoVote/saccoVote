from django.contrib.auth.models import Group, User
from rest_framework import serializers

from base.models import Sacco, UserSacco


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class SaccoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Sacco
        fields = '__all__'


class UserSaccoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserSacco
        fields = '__all__'


class CreateUserSaccoSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    sacco_name = serializers.CharField(max_length=100)
    username = serializers.CharField(max_length=100)

    def create(self, validated_data):
        user = User.objects.filter(email=validated_data['email']).first()

        if not user:
            user = User.objects.create_user(
                email=validated_data['email'],
                password=validated_data['password'],
                username=validated_data['username']
            )

        sacco = Sacco.objects.create(name=validated_data['sacco_name'])

        user_sacco = UserSacco.objects.create(user=user, sacco=sacco, role='admin')
        return user_sacco
