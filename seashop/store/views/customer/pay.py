from django.template import loader
from django.urls import reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.views import View
from store.models.customer.invoices import Invoice
from store.models.customer.cart import Cart
import datetime
class Pay(View):
    def get(self, request):
        cart = request.session.get('cart')
        context = {
            'cart': cart
        }
        template = loader.get_template('customer/pay.html')
        return HttpResponse(template.render(context, request))

    def post(self, request):
        cus = request.session.get('customer_id')
        name=request.POST.get('name')
        email=request.POST.get('email')
        phone=request.POST.get('phone')
        address=request.POST.get('address')
        province=request.POST.get('province')
        city=request.POST.get('city')
        date=datetime.datetime.now()
        Invoice.set_invoice(email,name,phone,cus,address,province,city,date)
        request.session['cart']=None
        Cart.delete_cart_by_cusId(cus)
        return HttpResponseRedirect(reverse('index'))
