from django.db import models
from .customers import Customer


class Addressdetail(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    email = models.CharField(max_length=255)
    first_Name = models.CharField(max_length=255)
    last_Name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    province = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    city = models.CharField(max_length=255)

    @staticmethod
    def set_address(cus, email, fn, ln, cm, address, province, phone, city):
        cus_ = Customer.objects.all().get(id=cus)
        adr = Addressdetail(customer=cus_, email=email, first_Name=fn, last_Name=ln,
                            company=cm, address=address, province=province, phone=phone, city=city)
        adr.save()

    @staticmethod
    def get_address_by_cus(cus):
        cus = Customer.objects.all().get(id=cus)
        if Addressdetail.objects.all().filter(customer=cus):
            return Addressdetail.objects.all().get(customer=cus)
        else:
            return None
