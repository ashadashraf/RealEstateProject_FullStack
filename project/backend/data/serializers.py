from rest_framework import serializers
from .models import Property, Locality, GeoCordinates, PropertyAccounts, OpenHouse
from .models import Appliances, Basement, FloorCovering, Rooms, IndoorFeatures, BuildingAmenities
from .models import ArchitecturalStyle, Exterior, OutdoorAmenities, Parking, Roof, View, Documents
from authentication.models import User

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
        is_updation = self.context.get('request') and self.context['request'].method == 'PUT'

        if is_creation or is_updation:
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
        if self.context and 'request' in self.context and self.context['request']:
            user_id = self.context.get('request').query_params.get('user_id')
            if user_id:
                user = User.objects.get(id=user_id)
                representation['liked'] = instance.is_liked_by_user(user)
        return representation
    
    def update(self, instance, validated_data):
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.email = validated_data.get('email', instance.email)
        instance.related_website = validated_data.get('related_website', instance.related_website)
        instance.transaction_type = validated_data.get('transaction_type', instance.transaction_type)
        instance.price = validated_data.get('price', instance.price)
        instance.address = validated_data.get('address', instance.address)
        instance.virtual_tour_url = validated_data.get('virtual_tour_url', instance.virtual_tour_url)
        instance.lot_size = validated_data.get('lot_size', instance.lot_size)
        instance.basement_square_feet = validated_data.get('basement_square_feet', instance.basement_square_feet)
        instance.garage_square_feet = validated_data.get('garage_square_feet', instance.garage_square_feet)
        instance.finished_square_feet = validated_data.get('finished_square_feet', instance.finished_square_feet)
        instance.description = validated_data.get('description', instance.description)
        instance.more_description = validated_data.get('more_description', instance.more_description)
        instance.year_build = validated_data.get('year_build', instance.year_build)
        instance.remodal_year = validated_data.get('remodal_year', instance.remodal_year)
        instance.bedroom = validated_data.get('bedroom', instance.bedroom)
        instance.bathroom = validated_data.get('bathroom', instance.bathroom)
        
        # Update Accounts fields
        property_accounts_data = validated_data.pop('accounts', {})
        for field in ['down_payment', 'loan_years', 'interest_rate', 'tax_rate']:
            setattr(instance.accounts, field, property_accounts_data.get(field, getattr(instance.accounts, field)))
        instance.accounts.save()
        
        # Update Open House fields
        open_house_data = validated_data.pop('open_house', {})
        for field in ['date', 'end_time', 'start_time']:
            setattr(instance.open_house, field, open_house_data.get(field, getattr(instance.open_house, field)))
        instance.open_house.save()

        # Update Appliances fields
        appliances_data = validated_data.pop('appliances', {})
        for field in ['dishwasher', 'dry', 'freezer', 'garbage_disposal', 'micro_wave', 'oven', 'refrigerator', 'trash_compator', 'washer']:
            setattr(instance.appliances, field, appliances_data.get(field, getattr(instance.appliances, field)))
        instance.appliances.save()

        # Update Basement fields
        basement_data = validated_data.pop('basement', {})
        for field in ['finished', 'unfinished', 'partially_finished']:
            setattr(instance.basement, field, basement_data.get(field, getattr(instance.basement, field)))
        instance.basement.save()

        # Update FloorCovering fields
        floor_covering_data = validated_data.pop('floor_covering', {})
        for field in ['carpet', 'concrete', 'hardwood', 'laminate', 'linoleum', 'softwood', 'tile', 'slate', 'other_floor_covering']:
            setattr(instance.floor_covering, field, floor_covering_data.get(field, getattr(instance.floor_covering, field)))
        instance.floor_covering.save()

        # Update Rooms fields
        rooms_data = validated_data.pop('rooms', {})
        for field in ['dining_room', 'family_room', 'laundry_room', 'library', 'breakfast_nook', 'office', 'recreation_room', 'master_room', 'pantry', 'workshop', 'total_rooms']:
            setattr(instance.rooms, field, rooms_data.get(field, getattr(instance.rooms, field)))
        instance.rooms.save()

        # Update IndoorFeatures fields
        indoor_features_data = validated_data.pop('indoor_features', {})
        for field in ['security_system', 'cable', 'ceiling_fans', 'fire_place', 'wired']:
            setattr(instance.indoor_features, field, indoor_features_data.get(field, getattr(instance.indoor_features, field)))
        instance.indoor_features.save()

        # Update BuildingAmenities fields
        building_amenities_data = validated_data.pop('building_amenities', {})
        for field in ['gated_entry', 'near_transportation', 'controlled_access', 'storage', 'elevator']:
            setattr(instance.building_amenities, field, building_amenities_data.get(field, getattr(instance.building_amenities, field)))
        instance.building_amenities.save()

        # Update ArchitecturalStyle fields
        architectural_style_data = validated_data.pop('architectural_style', {})
        for field in ['bungalow', 'modern', 'villa', 'loft']:
            setattr(instance.architectural_style, field, architectural_style_data.get(field, getattr(instance.architectural_style, field)))
        instance.architectural_style.save()

        # Update Exterior fields
        exterior_data = validated_data.pop('exterior', {})
        for field in ['brick', 'cement', 'wood', 'stone', 'stucco', 'metal', 'vinyl', 'other_exterior']:
            setattr(instance.exterior, field, exterior_data.get(field, getattr(instance.exterior, field)))
        instance.exterior.save()

        # Update OutdoorAmenities fields
        outdoor_amenities_data = validated_data.pop('outdoor_amenities', {})
        for field in ['balcony', 'barbecue_area', 'pond', 'pool', 'porch', 'rv_parking', 'water_front', 'spa', 'sprinkler_system']:
            setattr(instance.outdoor_amenities, field, outdoor_amenities_data.get(field, getattr(instance.outdoor_amenities, field)))
        instance.outdoor_amenities.save()

        # Update Parking fields
        parking_data = validated_data.pop('parking', {})
        for field in ['carport', 'off_street', 'on_street', 'garage_attached', 'garage_detached', 'parking_spaces']:
            setattr(instance.parking, field, parking_data.get(field, getattr(instance.parking, field)))
        instance.parking.save()

        # Update Roof fields
        roof_data = validated_data.pop('roof', {})
        for field in ['build_up', 'asphalt', 'concrete', 'slate', 'tile', 'composition', 'metal']:
            setattr(instance.roof, field, roof_data.get(field, getattr(instance.roof, field)))
        instance.roof.save()

        # Update View fields
        view_data = validated_data.pop('view', {})
        for field in ['city', 'mountain', 'park', 'territorial', 'water']:
            setattr(instance.view, field, view_data.get(field, getattr(instance.view, field)))
        instance.view.save()

        # Save the Property instance after making updates
        instance.save()
        print(instance.garage_square_feet)
        return instance

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
        if self.context and 'request' in self.context and self.context['request']:
            user_id = self.context.get('request').query_params.get('user_id')
            if user_id:
                user = User.objects.get(id=user_id)
                representation['liked'] = instance.is_liked_by_user(user)
        
        return representation
    
class FavouritesSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('favourites',)

class PropertyStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ('is_active',)