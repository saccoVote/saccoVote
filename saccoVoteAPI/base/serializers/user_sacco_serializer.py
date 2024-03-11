from rest_framework import serializers

from base.models import UserSacco


class UserSaccoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserSacco
        fields = '__all__'
