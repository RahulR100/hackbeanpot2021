from django.db import models

# Create your models here.
class Product(models.Model):
	title 		= models.CharField(max_length=120)
	userListed 	= models.ForeignKey('users.User', on_delete=models.CASCADE)
	thumbnail	= models.ImageField(null=True, blank=True)
	quantity	= models.PositiveIntegerField()
	price 		= models.DecimalField(decimal_places=2, max_digits=10)
	location 	= models.TextField()
	description = models.TextField(default="No description provided.")
	tags 		= models.TextField()
