import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

import django
django.setup()

from rest_framework import serializers
from .models import Property, Locality, GeoCordinates, PropertyAccounts, OpenHouse
from .models import Appliances, Basement, FloorCovering, Rooms, IndoorFeatures, BuildingAmenities
from .models import ArchitecturalStyle, Exterior, OutdoorAmenities, Parking, Roof, View, Documents
from authentication.models import User
from datetime import datetime
from rest_framework import viewsets, parsers

import os

class LocalitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Locality
        fields = ['pincode', 'unit', 'district', 'state']

class GeoCordinatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeoCordinates
        fields = ['latitude', 'longitude']

class PropertyAccountsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyAccounts
        fields = ['down_payment', 'loan_years', 'interest_rate', 'tax_rate']

class OpenHouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpenHouse
        fields = ['date', 'start_time', 'end_time']

class AppliancesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appliances
        fields = ['dishwasher', 'dry', 'freezer', 'garbage_disposal', 'micro_wave', 'oven', 'refrigerator', 'trash_compator', 'washer']

class BasementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Basement
        fields = ['finished', 'unfinished', 'partially_finished']

class FloorCoveringSerializer(serializers.ModelSerializer):
    class Meta:
        model = FloorCovering
        fields = ['carpet', 'concrete', 'hardwood', 'laminate', 'linoleum', 'softwood', 'tile', 'slate', 'other_floor_covering']

class RoomsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rooms
        fields = ['dining_room', 'family_room', 'laundry_room', 'library', 'breakfast_nook', 'office', 'recreation_room', 'master_room', 'pantry', 'workshop', 'total_rooms']

class IndoorFeaturesSerializer(serializers.ModelSerializer):
    class Meta:
        model = IndoorFeatures
        fields = ['security_system', 'cable', 'ceiling_fans', 'fire_place', 'wired']

class BuildingAmenitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuildingAmenities
        fields = ['gated_entry', 'near_transportation', 'controlled_access', 'storage', 'elevator']

class ArchitecturalStyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArchitecturalStyle
        fields = ['bungalow', 'modern', 'villa', 'loft']

class ExteriorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exterior
        fields = ['brick', 'cement', 'wood', 'stone', 'stucco', 'metal', 'vinyl', 'other_exterior']

class OutdoorAmenitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = OutdoorAmenities
        fields = ['balcony', 'barbecue_area', 'pond', 'pool', 'porch', 'rv_parking', 'water_front', 'spa', 'sprinkler_system']

class ParkingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parking
        fields = ['carport', 'off_street', 'on_street', 'garage_attached', 'garage_detached', 'parking_spaces']

class RoofSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roof
        fields = ['build_up', 'asphalt', 'concrete', 'slate', 'tile', 'composition', 'metal']

class ViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = View
        fields = ['city', 'mountain', 'park', 'territorial', 'water']

class UserIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = 'id'

class DocumentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Documents
        fields = ['property', 'image', 'created_at']
    
    def create(self, validated_data):
        property_id = validated_data.pop('property')
        image = validated_data.pop('image')
        documents = Documents.objects.create(property=property_id, image=image)
        return documents

class PropertySerializer(serializers.ModelSerializer):
    # user_id = UserIdSerializer(many=True, read_only=True)
    locality = LocalitySerializer()
    coordinates = GeoCordinatesSerializer()
    accounts = PropertyAccountsSerializer()
    open_house = OpenHouseSerializer()
    appliances = AppliancesSerializer()
    basement = BasementSerializer()
    floor_covering = FloorCoveringSerializer()
    rooms = RoomsSerializer()
    indoor_features = IndoorFeaturesSerializer()
    building_amenities = BuildingAmenitiesSerializer()
    architectural_style = ArchitecturalStyleSerializer()
    exterior = ExteriorSerializer()
    outdoor_amenities = OutdoorAmenitiesSerializer()
    parking = ParkingSerializer()
    roof = RoofSerializer()
    view = ViewSerializer()
    images = DocumentsSerializer(many=True)
    
    class Meta:
        model = Property
        fields = ['id', 'user_id', 'phone_number', 'email', 'related_website', 'property_name', 'transaction_type', 
                  'property_type', 'price', 'address', 'locality', 'coordinates', 'accounts',
                  'virtual_tour_url', 'lot_size', 'basement_square_feet', 'garage_square_feet',
                  'finished_square_feet', 'description', 'more_description', 'year_build',
                  'remodal_year', 'bedroom', 'bathroom', 'open_house', 'appliances', 'basement', 
                  'floor_covering', 'rooms', 'indoor_features', 'building_amenities', 
                  'architectural_style', 'exterior', 'outdoor_amenities', 'parking', 'roof', 'view', 
                  'images', 'posted_on', 'is_active']
        
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        is_creation = self.context.get('request') and self.context['request'].method == 'POST'

        if is_creation:
            self.fields.pop('images')

    def create(self, validated_data):
        print('/////////////////////////')
        print(validated_data)
        user_id = validated_data.pop('user_id')
        print(user_id)

        locality_data = validated_data.pop('locality')
        locality_instance = Locality.objects.create(**locality_data)

        geo_cordinates_data = validated_data.pop('coordinates')
        geo_cordinates_instance = GeoCordinates.objects.create(**geo_cordinates_data)
        
        property_accounts_data = validated_data.pop('accounts')
        property_accounts_instance = PropertyAccounts.objects.create(**property_accounts_data)
        
        open_house_data = validated_data.pop('open_house')
        open_house_instance = OpenHouse.objects.create(**open_house_data)
        
        appliances_data = validated_data.pop('appliances')
        appliances_instance = Appliances.objects.create(**appliances_data)
        
        basement_data = validated_data.pop('basement')
        basement_instance = Basement.objects.create(**basement_data)
        
        floor_covering_data = validated_data.pop('floor_covering')
        floor_covering_instance = FloorCovering.objects.create(**floor_covering_data)

        rooms_data = validated_data.pop('rooms')
        rooms_instance = Rooms.objects.create(**rooms_data)
        
        indoor_features_data = validated_data.pop('indoor_features')
        indoor_features_instance = IndoorFeatures.objects.create(**indoor_features_data)

        building_amenities_data = validated_data.pop('building_amenities')
        building_amenities_instance = BuildingAmenities.objects.create(**building_amenities_data)

        architectural_style_data = validated_data.pop('architectural_style')
        architectural_style_instance = ArchitecturalStyle.objects.create(**architectural_style_data)

        exterior_data = validated_data.pop('exterior')
        exterior_instance = Exterior.objects.create(**exterior_data)

        outdoor_amenities_data = validated_data.pop('outdoor_amenities')
        outdoor_amenities_instance = OutdoorAmenities.objects.create(**outdoor_amenities_data)

        parking_data = validated_data.pop('parking')
        parking_instance = Parking.objects.create(**parking_data)

        roof_data = validated_data.pop('roof')
        roof_instance = Roof.objects.create(**roof_data)

        view_data = validated_data.pop('view')
        view_instance = View.objects.create(**view_data)

        property_instance = Property.objects.create(
            user_id = user_id,
            locality = locality_instance,
            coordinates = geo_cordinates_instance,
            accounts = property_accounts_instance,
            open_house = open_house_instance,
            appliances = appliances_instance,
            basement = basement_instance,
            floor_covering = floor_covering_instance,
            rooms = rooms_instance,
            indoor_features = indoor_features_instance,
            building_amenities = building_amenities_instance,
            architectural_style = architectural_style_instance,
            exterior = exterior_instance,
            outdoor_amenities = outdoor_amenities_instance,
            parking = parking_instance,
            roof = roof_instance,
            view = view_instance,
            **validated_data
        )
        return property_instance
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        documents = Documents.objects.filter(property=instance.id)
        image_data = DocumentsSerializer(documents, many=True).data
        representation['images'] = image_data
        return representation

class AllPropertiesSerializer(serializers.ModelSerializer):
    locality = LocalitySerializer()
    images = DocumentsSerializer(many=True)
    class Meta:
        model = Property
        fields = ['id', 'property_name', 'transaction_type', 'property_type', 'price', 'address', 
                  'locality', 'lot_size', 'basement_square_feet', 'bedroom', 'bathroom', 'images']
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        documents = Documents.objects.filter(property=instance.id)
        image_data = DocumentsSerializer(documents, many=True).data
        representation['images'] = image_data
        return representation
    
class FavouritesSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('favourites',)