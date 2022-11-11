from django.template import loader
from django.urls import reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.views import View
from store.models.customer.customers import Customer

class Login(View):
    def get(self, request):
        template = loader.get_template('customer/login.html')
        user = request.session.get('customerName')
        cart = request.session.get('cart')
        context = {
            'user': user,
            'count': len(cart)
        }

        return HttpResponse(template.render(context, request))

    def post(self, request):
        u = request.POST.get('username')
        password = request.POST.get('password')
        cus = Customer.get_customer(u, password)

        if cus:
            request.session['customer_id'] = cus.id
            request.session['Username'] = cus.Username
            return HttpResponseRedirect(reverse('index'))

        else:
            return HttpResponseRedirect(reverse('login'))
