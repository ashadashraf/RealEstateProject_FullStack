from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from phonenumber_field.modelfields import PhoneNumberField
# from data.models import Property
from chat_channel.models import Message
from django.utils import timezone

# Create your models here.

class UserManager(BaseUserManager):
    
    def create_user(self, username, email, phone_number, password=None, **kwargs):
        if username is None:
            raise TypeError('Users must have a username.')
        if email is None:
            raise TypeError('Users must have an email.')
        if phone_number is None:
            raise TypeError('Users must have a phone number.')
        
        user = self.model(username=username, email=self.normalize_email(email), phone_number=phone_number)
        user.set_password(password)
        user.save(using=self._db)

        return user
    
    def create_superuser(self, username, email, phone_number, password):
        if password is None:
            raise TypeError('Superuser must have a password.')
        if email is None:
            raise TypeError('Superuser must have an email.')
        if phone_number is None:
            raise TypeError('Superuser must have a phone number.')
        if username is None:
            raise TypeError('Superuser must have an username.')
        
        user = self.create_user(username=username, email=email, phone_number=phone_number, password=password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user
    

class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(db_index=True, max_length=50)
    email = models.EmailField(db_index=True, unique=True, null=False, blank=False)
    phone_number = PhoneNumberField(blank=False, null=False, unique=True)
    aadhar_number = models.CharField(max_length=50, null=True, blank=True, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    favourites = models.ManyToManyField('data.Property', related_name='favourites', blank=True)
    last_read_date = models.DateTimeField(auto_now_add=True, blank=False, null=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'phone_number']

    objects = UserManager()

    def __str__(self):
        return f"{self.email}"
    
    def read(self):
        self.last_read_date = timezone.now()
        self.save()
    
    def unread_messages(self):
        return Message.objects.filter(created_at__gt=self.last_read_date).count()