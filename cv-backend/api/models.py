from django.db import models

# Create your models here.
class WeatherData(models.Model):
    date = models.DateTimeField()
    location = models.CharField(max_length=100)
    Air_temperature = models.FloatField()
    Wind_speed = models.FloatField()
    Gust_speed = models.FloatField()
    Wind_direction = models.FloatField()
    Relative_humidity = models.FloatField()
    Dew_point_temperature = models.FloatField()
    Precipitation_amount = models.FloatField()
    Precipitation_intensity = models.FloatField()
    Snow_depth = models.FloatField()
    Pressure = models.FloatField()
    Horizontal_visibility = models.FloatField()
    Cloud_amount = models.FloatField()

    class Meta:
        unique_together = [['date', 'location']]

class Recipe(models.Model):
    name = models.CharField(max_length=120) 
    preptime = models.CharField(max_length=120) 
    image_link = models.CharField(max_length=120) 
    category = models.CharField(max_length=120) 
    description = models.CharField(max_length=120)
    ingredients = models.CharField(max_length=120)
    instructions = models.CharField(max_length=120)

class Ingredient(models.Model):
    basic = models.CharField(max_length=120)
    plural = models.CharField(max_length=120)


class Product(models.Model):
    category = models.CharField(max_length=120) 
    brand_name = models.CharField(max_length=120) 
    product_name = models.CharField(max_length=120) 
    ean_code = models.CharField(max_length=120) 
    price_wholenumber = models.IntegerField()
    price_decimal = models.IntegerField()
    price_unit = models.CharField(max_length=120)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)

