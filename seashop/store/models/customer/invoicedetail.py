from django.db import models
from django.db.models import Sum,Count
from .invoices import Invoice
from store.models.products.productdetail import Productdetail
from store.models.products.product import Product
# from store.models.products.sizes import Size
# from invoices import Invoice


class Invoicedetail(models.Model):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE)
    product = models.ForeignKey(Productdetail, on_delete=models.CASCADE)
    amount = models.IntegerField(default=1)
    total = models.IntegerField(default=0)

    @staticmethod
    def set_invoicedetail(email, name, phone, cus, address, province, city, date, request):
        invoice = Invoice.set_invoice(
            email, name, phone, cus, address, province, city, date)
             
        cart = request.session.get('cart')
        total=0
        for x in cart:
            prt_= Product.objects.all().get(id=x.get('product'))
            total=total+prt_.price*x.get('quatity')
        
        for x in cart:
            prt = Productdetail.objects.all().get(id=x.get('product'))
            prt_= Product.get_product_by_id(id=x.get('product'))       
            inv=Invoicedetail(invoice=invoice,product=prt,amount=x.get('quatity'),total=prt_.price*x.get('quatity'))
            inv.save()
        
       
    @staticmethod
    def get_invoicedetail(cus):
        inv=Invoice.get_invoice(cus)
        # invd={}
        for x in inv:
            # invd['total']= Invoicedetail.objects.all().filter(invoice=x.id).aggregate(Sum('total'))
            invd=Invoice.objects.annotate(count=Count('invoicedetail')).filter(id=x.id)
            # invd['cout_prt']=invd_[0].count
        return invd