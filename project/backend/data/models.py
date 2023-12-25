from django.db import models
from datetime import datetime
from django.contrib.auth import get_user_model
from PIL import Image
from io import BytesIO
from django.core.files import File

# Create your models here.

class Locality(models.Model):
    pincode = models.IntegerField(null=False, blank=False)
    unit = models.CharField(null=False, blank=False)
    district = models.CharField(null=False, blank=False)
    state = models.CharField(null=False, blank=False)

class GeoCordinates(models.Model):
    latitude = models.CharField(null=False, blank=False)
    longitude = models.CharField(null=False, blank=False)

class PropertyAccounts(models.Model):
    down_payment = models.CharField(null=True, blank=True)
    loan_years = models.CharField(null=True, blank=True)
    interest_rate = models.CharField(null=True, blank=True)
    tax_rate = models.CharField(null=True, blank=True)

class OpenHouse(models.Model):
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

class Appliances(models.Model):
    dishwasher = models.BooleanField(default=False)
    dry = models.BooleanField(default=False)
    freezer = models.BooleanField(default=False)
    garbage_disposal = models.BooleanField(default=False)
    micro_wave = models.BooleanField(default=False)
    oven = models.BooleanField(default=False)
    refrigerator = models.BooleanField(default=False)
    trash_compator = models.BooleanField(default=False)
    washer = models.BooleanField(default=False)

class Basement(models.Model):
    finished = models.BooleanField(default=False)
    unfinished = models.BooleanField(default=False)
    partially_finished = models.BooleanField(default=False)

class FloorCovering(models.Model):
    carpet = models.BooleanField(default=False)
    concrete = models.BooleanField(default=False)
    hardwood = models.BooleanField(default=False)
    laminate = models.BooleanField(default=False)
    linoleum = models.BooleanField(default=False)
    softwood = models.BooleanField(default=False)
    tile = models.BooleanField(default=False)
    slate = models.BooleanField(default=False)
    other_floor_covering = models.BooleanField(default=False)

class Rooms(models.Model):
    dining_room = models.BooleanField(default=False)
    family_room = models.BooleanField(default=False)
    laundry_room = models.BooleanField(default=False)
    library = models.BooleanField(default=False)
    breakfast_nook = models.BooleanField(default=False)
    office = models.BooleanField(default=False)
    recreation_room = models.BooleanField(default=False)
    master_room = models.BooleanField(default=False)
    pantry = models.BooleanField(default=False)
    workshop = models.BooleanField(default=False)
    total_rooms = models.IntegerField()

class IndoorFeatures(models.Model):
    security_system = models.BooleanField(default=False)
    cable = models.BooleanField(default=False)
    ceiling_fans = models.BooleanField(default=False)
    fire_place = models.BooleanField(default=False)
    wired = models.BooleanField(default=False)

class BuildingAmenities(models.Model):
    gated_entry = models.BooleanField(default=False)
    near_transportation = models.BooleanField(default=False)
    controlled_access = models.BooleanField(default=False)
    storage = models.BooleanField(default=False)
    elevator = models.BooleanField(default=False)

class ArchitecturalStyle(models.Model):
    bungalow = models.BooleanField(default=False)
    modern = models.BooleanField(default=False)
    villa = models.BooleanField(default=False)
    loft = models.BooleanField(default=False)

class Exterior(models.Model):
    brick = models.BooleanField(default=False)
    cement = models.BooleanField(default=False)
    wood = models.BooleanField(default=False)
    stone = models.BooleanField(default=False)
    stucco = models.BooleanField(default=False)
    metal = models.BooleanField(default=False)
    vinyl = models.BooleanField(default=False)
    other_exterior = models.BooleanField(default=False)

class OutdoorAmenities(models.Model):
    balcony = models.BooleanField(default=False)
    barbecue_area = models.BooleanField(default=False)
    pond = models.BooleanField(default=False)
    pool = models.BooleanField(default=False)
    porch = models.BooleanField(default=False)
    rv_parking = models.BooleanField(default=False)
    water_front = models.BooleanField(default=False)
    spa = models.BooleanField(default=False)
    sprinkler_system = models.BooleanField(default=False)

class Parking(models.Model):
    carport = models.BooleanField(default=False)
    off_street = models.BooleanField(default=False)
    on_street = models.BooleanField(default=False)
    garage_attached = models.BooleanField(default=False)
    garage_detached = models.BooleanField(default=False)
    parking_spaces = models.IntegerField()

class Roof(models.Model):
    build_up = models.BooleanField(default=False)
    asphalt = models.BooleanField(default=False)
    concrete = models.BooleanField(default=False)
    slate = models.BooleanField(default=False)
    tile = models.BooleanField(default=False)
    composition = models.BooleanField(default=False)
    metal = models.BooleanField(default=False)

class View(models.Model):
    city = models.BooleanField(default=False)
    mountain = models.BooleanField(default=False)
    park = models.BooleanField(default=False)
    territorial = models.BooleanField(default=False)
    water = models.BooleanField(default=False)

class Property(models.Model):
    user_id = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='user_id')
    phone_number = models.CharField(null=False, blank=False)
    email = models.CharField(null=False, blank=False)
    related_website = models.CharField(null=True, blank=True)
    property_name = models.CharField(null=False, blank=False)
    transaction_type = models.CharField(null=False, blank=False)
    property_type = models.CharField(null=False, blank=False)
    price = models.CharField(null=False, blank=False)
    address = models.CharField(null=False, blank=False)
    locality = models.ForeignKey(Locality, on_delete=models.CASCADE, related_name='locality')
    coordinates = models.ForeignKey(GeoCordinates, on_delete=models.CASCADE, related_name='coordinates')
    accounts = models.ForeignKey(PropertyAccounts, on_delete=models.CASCADE, related_name='accounts')
    virtual_tour_url = models.CharField(null=True, blank=True)
    lot_size = models.CharField(null=False, blank=False)
    basement_square_feet = models.CharField(null=True, blank=True)
    garage_square_feet = models.CharField(null=True, blank=True)
    finished_square_feet = models.CharField(null=True, blank=True)
    description = models.CharField(null=False, blank=False)
    more_description = models.CharField(null=False, blank=True)
    year_build = models.DateField(null=True, blank=True)
    remodal_year = models.DateField(null=True, blank=True)
    bedroom = models.IntegerField(null=True, blank=True)
    bathroom = models.IntegerField(null=True, blank=True)
    open_house = models.ForeignKey(OpenHouse, on_delete=models.CASCADE, related_name='open_house')
    appliances = models.ForeignKey(Appliances, null=True, blank=True, on_delete=models.CASCADE, related_name='appliances')
    basement = models.ForeignKey(Basement, on_delete=models.CASCADE, related_name='basement')
    floor_covering = models.ForeignKey(FloorCovering, on_delete=models.CASCADE, related_name='floor_covering')
    rooms = models.ForeignKey(Rooms, on_delete=models.CASCADE, related_name='rooms')
    indoor_features = models.ForeignKey(IndoorFeatures, on_delete=models.CASCADE, related_name='indoor_features')
    building_amenities = models.ForeignKey(BuildingAmenities, on_delete=models.CASCADE, related_name='building_amenities')
    architectural_style = models.ForeignKey(ArchitecturalStyle, on_delete=models.CASCADE, related_name='architectural_style')
    exterior = models.ForeignKey(Exterior, on_delete=models.CASCADE, related_name='exterior')
    outdoor_amenities = models.ForeignKey(OutdoorAmenities, on_delete=models.CASCADE, related_name='outdoor_amenities')
    parking = models.ForeignKey(Parking, on_delete=models.CASCADE, related_name='parking')
    roof = models.ForeignKey(Roof, on_delete=models.CASCADE, related_name='roof')
    view = models.ForeignKey(View, on_delete=models.CASCADE, related_name='view')
    posted_on = models.DateTimeField(default=datetime.now)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.property_name
    
    def is_liked_by_user(self, user):
        return user.favourites.filter(id=self.id).exists()

def upload_to(instance, filename):
    if (instance.is_image):
        return 'images/{filename}'.format(filename=filename)
    else:
        return 'videos/{filename}'.format(filename=filename)

class Documents(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name="images", null=False, blank=False)
    image = models.ImageField(upload_to='images/', null=False, blank=False, verbose_name='Property Image')
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        new_image = self.reduce_image_size(self.image)
        self.image = new_image
        super().save(*args, **kwargs)

    def reduce_image_size(self, image):
        print(image)
        img = Image.open(image)
        thumb_io = BytesIO()
        img.save(thumb_io, 'jpeg', quality=50)
        new_image = File(thumb_io, name=image.name)
        return new_image