from django.contrib.auth.models import Group
from rest_framework import serializers
from django.contrib.auth import authenticate

from base.models import Sacco, UserSacco, CustomUser


class CustomUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'password']
        extra_kwargs = {'password': {'write_only': True}}


class CustomAuthTokenSerializer(serializers.Serializer):
    email = serializers.EmailField(label="Email")
    password = serializers.CharField(label="Password", style={'input_type': 'password'})

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(request=self.context.get('request'), email=email, password=password)

            if not user:
                msg = 'Unable to log in with provided credentials.'
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = 'Must include "email" and "password".'
            raise serializers.ValidationError(msg, code='authorization')

        attrs['user'] = user
        return attrs


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
