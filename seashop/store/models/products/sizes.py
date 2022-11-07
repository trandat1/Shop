from email.policy import default
from django.db import models


class Size(models.Model):
    size = [
        ('S', 'S'),
        ('M', 'M'),
        ('L', 'L'),
        ('XL', 'XL'),
        ('XXL', 'XXL'),
    ]
    size = models.CharField(max_length=10, choices=size, default="S")

    def __str__(self):
        return self.size
