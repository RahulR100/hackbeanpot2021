from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser, models.Model):
	first_name 		= models.CharField(max_length=100)
	last_name 		= models.CharField(max_length=100)
	email 			= models.CharField(max_length=255)
	phone_number 	= models.PositiveIntegerField(null=True, blank=True)
	address 		= models.TextField()
	is_seller		= models.BooleanField(default=False)
	cart 			= models.ForeignKey('cart.Cart', on_delete=models.CASCADE, null=True, blank=True)