from random import choices
from secrets import choice
from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='static/uploads/products')
    price = models.IntegerField(default=0)
    status = [
        ('success', '1'),
        ('failure', '0')
    ]
    status = models.CharField(max_length=10, choices=status, default='1')
    description = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    def get_all_products():
        return Product.objects.all().values()

    def get_product_by_name(name):
        return Product.objects.all().get(name=name)
    def get_product_by_id(id):
        return Product.objects.all().get(id=id)