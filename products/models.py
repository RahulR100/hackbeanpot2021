from django.db import models

# Create your models here.
class Product(models.Model):
	title 		= models.CharField(max_length=120)
	userListed 	= models.TextField()
	thumbnail	= models.ImageField()
	quantity	= models.PositiveIntegerField()
	price 		= models.PositiveIntegerField()
	location 	= models.TextField()
	description = models.TextField(default="No description provided.")
	tags 		= models.JSONField()
