from django.template import loader
from django.urls import reverse
from django.http import HttpResponse, HttpResponseRedirect
from store.models.customer.invoicedetail import Invoicedetail
from store.models.customer.invoices import Invoice
from django.views import View
from store.models.customer.statusinvoice import status
import datetime

class view_invoices(View):
    def get(self, request, id):
        cus = request.session.get('customer_id')
        cart = request.session.get('cart')
        invd_ = Invoicedetail.get_invoicedetail_by_id(id)

        inv = Invoice.get_invoice_by_id(id)
        st = status.get_status(inv.id)
        print(datetime.datetime.now())
        if not cart:
            cart = []
            request.session['cart'] = []

        context = {
            'invd': invd_,
            'id': id,
            # 'inv': inv,
            'st': st,
            'count': len(cart)
        }

        template = loader.get_template('customer/view_invoices.html')
        return HttpResponse(template.render(context, request))
