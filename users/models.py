from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser, models.Model):
	first_name 		= models.TextField()
	last_name 		= models.TextField()
	email 			= models.TextField()
	phone_number 	= models.PositiveIntegerField(null=True, blank=True)
	address 		= models.TextField()
	is_buyer		= models.BooleanField(default=False)