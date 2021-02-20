from django.db import models

# Create your models here.
class Cart(models.Model):
	product = models.ForeignKey('products.Product', on_delete=models.CASCADE, null=True, blank=True)