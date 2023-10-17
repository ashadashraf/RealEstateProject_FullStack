from maps.models import Maps
from rest_framework import serializers
from django.core.exceptions import ObjectDoesNotExist

class MapsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maps
        fields = ['title', 'latitude', 'longitude']
        