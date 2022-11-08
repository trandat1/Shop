from django.template import loader
from django.urls import reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.views import View


class Cart(View):
    def get(self, request):
        cart = request.session.get('cart')
        template = loader.get_template('customer/cart.html')
        print(cart)
        context = {
            'cart': cart,
        }
        return HttpResponse(template.render(context, request))
