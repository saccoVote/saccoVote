from rest_framework import serializers

from base.models import CustomUser, Sacco, SaccoUser


class SignupSerializer(serializers.Serializer):
    """
    Signup serializer for creating new saccos and adding an admin user
    """
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    sacco_name = serializers.CharField(max_length=100)
