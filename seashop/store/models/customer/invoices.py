from django.db import models
from .customers import Customer

# from .invoicedetail import Invoicedetail


class Invoice(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, default='')
    email = models.CharField(max_length=255, default='')
    phone = models.CharField(max_length=11, default='')
#     invoicedetail = models.ForeignKey(Invoicedetail, on_delete=models.CASC)
    date = models.DateTimeField(default='')
    status = [
        ('success', '1'),
        ('wait', '0'),
        ('return', '2'),
        ('revoke', '3')
    ]
    address = models.CharField(max_length=255)
    province = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    status = models.CharField(max_length=10, choices=status, default='success')

    @staticmethod
    def set_invoice(email, name, phone, cus, address, province, city, date):
        cus = Customer.objects.get(id=cus)
        if not name:
            name = cus.Username
        if not email:
            email = cus.email
        if not phone:
            phone = cus.phone
        invoice = Invoice(name=name, email=email, phone=phone, customer=cus,
                          address=address, province=province, city=city, date=date)
        invoice.save()
        return invoice

    @staticmethod
    def get_invoice(cus):
        return Invoice.objects.filter(customer=cus)
