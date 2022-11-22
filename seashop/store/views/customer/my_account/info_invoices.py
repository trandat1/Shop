from django.template import loader
from django.urls import reverse
from django.http import HttpResponse, HttpResponseRedirect
from store.models.customer.invoicedetail import Invoicedetail
from store.models.customer.invoices import Invoice
from django.views import View


class Info_invoices(View):
    def get(self, request):
        cus = request.session.get('customer_id')
        cart = request.session.get('cart')
        invd = Invoicedetail.get_invoicedetail(cus)
        print(invd)
        print(invd[0].count)
        inv = Invoice.get_invoice(cus)
        for x in inv:
            print(x.status)
        if not cart:
            cart = []
            request.session['cart'] = []

        context = {
            'inv': inv,
            'count': len(cart)
        }

        template = loader.get_template('customer/invoices.html')
        return HttpResponse(template.render(context, request))
