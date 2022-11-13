from django.db import models
from .invoices import Invoice
# from store.models.products.productdetail import Productdetail
# from store.models.products.sizes import Size

class Invoicedetail(models.Model):
        invoice=models.ForeignKey(Invoice,on_delete=models.CASCADE)
        product=models.CharField(max_length=255)
        size=models.CharField(max_length=10)
        amount=models.IntegerField
        total=models.IntegerField
        
        