from django.db import models


class Promotion(models.Model):
    code = models.CharField(max_length=10)
    worth = models.IntegerField
    status = [
        ('1', '1'),
        ('0', "0")
    ]
