from email.policy import default
from django.db import models


class Size(models.Model):
    size = [
        ('S', 'S'),
        ('M', 'M'),
        ('L', 'L'),
        ('XL', 'XL'),
        ('XXL', 'XXL'),
        ('33','33'),
        ('32','32'),
        ('30','30'),
        ('31','31')
    ]
    
    size = models.CharField(max_length=10, choices=size, default="S")

    def __str__(self):
        return self.size
    @staticmethod
    def get_size(name):
        return Size.objects.all().get(size=name)