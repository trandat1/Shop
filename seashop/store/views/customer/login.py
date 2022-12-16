from django.template import loader
from django.urls import reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.views import View
from store.models.customer.customers import Customer
from store.models.customer.cart import Cart
from store.views.check.check_account import Check_Validate

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
            request.session['Email'] = cus.email
            cart = Cart.get_cart_by_cusId(cus.id)
            request.session['cart'] = cart
            return HttpResponseRedirect(reverse('index'))

        else:
            erro = "Error creating"
            template = loader.get_template('customer/login.html')
            user = request.session.get('customerName')
            cart = request.session.get('cart')
            context = {
                'user': user,
                'count': len(cart),
                'e': erro
            }

            return HttpResponse(template.render(context, request))
