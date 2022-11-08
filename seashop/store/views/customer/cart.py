from django.template import loader
from django.urls import reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.views import View


class Cart(View):
    def get(self,request):
        template = loader.get_template('customer/cart.html')
        return HttpResponse(template.render())
