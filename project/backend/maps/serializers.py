import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

import django
django.setup()

from maps.models import Maps
from data.models import Property
from data.serializers import GeoCordinatesSerializer
from rest_framework import serializers
from django.core.exceptions import ObjectDoesNotExist

class MapsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maps
        fields = ['title', 'latitude', 'longitude']
        

class AllCoordinatesSerializer(serializers.ModelSerializer):
    coordinates = GeoCordinatesSerializer()
    
    class Meta:
        model = Property
        fields = ['property_name', 'description', 'coordinates']
