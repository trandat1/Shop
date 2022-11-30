from django.db import models
from django.db.models import Sum, Count
from .invoices import Invoice
from store.models.products.productdetail import Productdetail
from store.models.products.product import Product
from store.models.products.sizes import Size
from .statusinvoice import status
# from invoices import Invoice


class Invoicedetail(models.Model):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE,default='')
    size=models.ForeignKey(Size, on_delete=models.CASCADE,default='')
    amount = models.IntegerField(default=1)
    total = models.IntegerField(default=0)

    @staticmethod
    def set_invoicedetail(email, name, phone, cus, address, province, city, date, request):
        invoice = Invoice.set_invoice(
            email, name, phone, cus, address, province, city)
        status.set_status(invoice,date)
        cart = request.session.get('cart')

        for x in cart:
            size=Size.get_size(x.get('size'))
            prt_ = Product.get_product_by_id(x.get('product'))
            inv = Invoicedetail(invoice=invoice, product=prt_, amount=x.get(
                'quatity'), total=prt_.price*x.get('quatity'),size=size)
            inv.save()
            Productdetail.update_quatity(x.get('product'),x.get('size'),x.get('quatity'))

    @staticmethod
    def get_invoicedetail(cus):
        inv = Invoice.get_invoice(cus)
        invd = []
        for x in inv:
            invd_ = {}
            st=status.get_status(x.id)
            invd_['invoice'] = x.id
            invd_['status'] = st.status
            invd_['date'] = st.date
            total = Invoicedetail.objects.all().filter(
                invoice=x.id).aggregate(Sum('total'))
            invd_['invd_total'] = total.get('total__sum')
            invd__ = (Invoice.objects.annotate(
                count=Count('invoicedetail')).filter(id=x.id))
            amount = Invoicedetail.objects.all().filter(
                invoice=x.id).aggregate(Sum('amount'))
            invd_['count_product']=amount.get('amount__sum')
            invd_['invd_id'] = invd__[0].id
            invd.append(invd_)
        return invd


    @staticmethod
    def get_invoicedetail_by_id(id):

        invd_ = Invoicedetail.objects.all().filter(invoice=id)
        invd = []

        for x in invd_:
            invd__ = {}
            pr = x.product
                
            invd__['product'] = pr.name
            invd__['size'] =x.size.size
            invd__['amount'] = x.amount
            invd__['total_price'] = pr.price*x.amount
            invd.append(invd__)
        return (invd)
