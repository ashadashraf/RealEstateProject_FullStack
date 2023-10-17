from django.db import models

# Create your models here.


class Maps(models.Model):
    title = models.CharField(max_length=244, null=False, blank=False)
    latitude = models.FloatField(blank=False, null=False)
    longitude = models.FloatField(blank=False, null=False)

    USERNAME_FIELD = 'title'
    REQUIRED_FIELD = ['latitude', 'longitude']

    def __str__(self):
        return self.title