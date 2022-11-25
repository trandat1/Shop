from django.template import loader
from django.urls import reverse
from django.http import HttpResponse, HttpResponseRedirect
from store.models.customer.invoicedetail import Invoicedetail
from store.models.customer.invoices import Invoice
from django.views import View


class invoices(View):
    def get(self, request):
        cus = request.session.get('customer_id')
        cart = request.session.get('cart')
        inv=Invoice.get_invoice(cus)
        if inv:
            invd = Invoicedetail.get_invoicedetail(cus)  
        else:
            invd=None
        print(invd)
        # inv = Invoice.get_invoice(cus)


        if not cart:
            cart = []
            request.session['cart'] = []


        context = {
            'invd': invd,
            'count': len(cart)
        }

        template = loader.get_template('customer/invoices.html')
        return HttpResponse(template.render(context, request))
