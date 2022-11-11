from django.db import models
from .customers import Customer
from store.models.products.product import Product

class Cart(models.Model):
        customer=models.ForeignKey(Customer,on_delete=models.CASCADE)
        product= models.ForeignKey(Product,on_delete=models.CASCADE)
       