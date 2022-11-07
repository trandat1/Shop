from django.db import models
import hashlib


class Customer(models.Model):
    Username = models.CharField(max_length=255)
    email = models.CharField(max_length=25)
    password = models.CharField(max_length=255)

    @staticmethod
    def set_customer(username, email, password):
        cus = Customer(Username=username, email=email,password=hashlib.md5(password.encode()).hexdigest())
        cus.save()

    def get_customer(u, pa):
        p = hashlib.md5(pa.encode()).hexdigest()
        if Customer.objects.filter(Username=u, password=p) or Customer.objects.filter(email=u, password=p):
            return Customer.objects.all().get(email=u)
        else:
            return None
