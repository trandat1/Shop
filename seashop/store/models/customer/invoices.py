from django.db import models
from .customers import Customer
# from .invoicedetail import Invoicedetail


class Invoice(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, default='')
    email = models.CharField(max_length=255, default='')
    phone = models.CharField(max_length=11, default='')
#     invoicedetail = models.ForeignKey(Invoicedetail, on_delete=models.CASC)
    address = models.CharField(max_length=255)
    province = models.CharField(max_length=255)
    city = models.CharField(max_length=255)


    @staticmethod
    def set_invoice(email, name, phone, cus, address, province, city):
        cus = Customer.objects.get(id=cus)
        if not name:
            name = cus.Username
        if not email:
            email = cus.email
        if not phone:
            phone = cus.phone
        invoice = Invoice(name=name, email=email, phone=phone, customer=cus,
                          address=address, province=province, city=city)
        invoice.save()
        return invoice

    @staticmethod
    def get_invoice(cus):
        if Invoice.objects.all().filter(customer=cus):
             return Invoice.objects.filter(customer=cus)
        else:
            return None
   
    @staticmethod
    def get_invoice_by_id(id):
        return Invoice.objects.all().get(id=id)