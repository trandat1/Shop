from django.template import loader
from django.urls import reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.views import View


class Pay(View):
    def get(self, request):
        cart = request.session.get('cart')
        context = {
            'cart' :cart
        }
        template = loader.get_template('customer/pay.html')
        return HttpResponse(template.render(context,request))
