from django.db import models
import hashlib


class Customer(models.Model):
    Username = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255, default='')
    last_name = models.CharField(max_length=255, default='')
    email = models.CharField(max_length=25)
    password = models.CharField(max_length=255)
    phone = models.CharField(max_length=11, default='')

    @staticmethod
    def set_customer(username, email, password):
        cus = Customer(Username=username, email=email,
                       password=hashlib.md5(password.encode()).hexdigest())
        cus.save()

    @staticmethod
    def get_customer(u, pa):
        p = hashlib.md5(pa.encode()).hexdigest()
        if Customer.objects.filter(Username=u, password=p) or Customer.objects.filter(email=u, password=p):
            return Customer.objects.all().get(email=u)
        else:
            return None

    @staticmethod
    def check_password(id, pa):
        cus = Customer.objects.all().get(id=id)
        if cus.password == hashlib.md5(pa.encode()).hexdigest():
            return True
        else:
            return False

    @staticmethod
    def update(id, email, first_name, last_name, username, password1=None):
        cus = Customer.objects.all().get(id=id)
        cus.email = email
        cus.first_name = first_name
        cus.last_name = last_name
        cus.Username = username
        if password1:
            cus.password = hashlib.md5(password1.encode()).hexdigest()
        cus.save()
