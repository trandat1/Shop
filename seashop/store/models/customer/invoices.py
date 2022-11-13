from django.db import models
from .customers import Customer
import datetime
# from .invoicedetail import Invoicedetail


class Invoice(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
#     invoicedetail = models.ForeignKey(Invoicedetail, on_delete=models.CASC)
    date = models.DateTimeField
    status = [
        ('success', '1'),
        ('wait', '0'),
        ('return', '2'),
    ]
    status = models.CharField(max_length=10, choices=status, default='success')

    @staticmethod
    def get_invoice(request):
        d = datetime.datetime.now()
        invoice = Invoice(customer=request.session.get('customer_id'), date=d)
        invoice.save()
