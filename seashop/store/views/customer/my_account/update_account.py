from django.template import loader
from django.urls import reverse
from django.http import HttpResponse, HttpResponseRedirect
from store.models.customer.customers import Customer
from django.views import View
from store.views.check.check_account import Check_Validate


class Update_account(View):
    def get(self, request):
        cus = {}
        cus['email'] = request.session.get('Email')
        cus['username'] = request.session.get('Username')
        cart = request.session.get('cart')
        if not cart:
            cart = []
            request.session['cart'] = []
        template = loader.get_template('customer/account.html')
        context = {
            'cus': cus,
            'count': len(cart)
        }
        return HttpResponse(template.render(context, request))

    def post(self, request):
        cus = request.session.get('customer_id')
        cus_ = Customer.objects.all().get(id=cus)
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        username = request.POST.get('name')
        email = request.POST.get('email')
        pass_ = request.POST.get('password_current')
        pass1 = request.POST.get('password_1')
        pass2 = request.POST.get('password_2')
        if pass_:
            if Customer.check_password(cus, pass_):
                Customer.update(cus, email, first_name,
                                last_name, username, pass1)
                return HttpResponseRedirect(reverse('customer'))
        else:
            erro = Check_Validate.validate(username, email, pass1, pass2)
            if not erro:
                Customer.update(cus, email, first_name, last_name, username)
                request.session['Username'] = cus_.Username
                return HttpResponseRedirect(reverse('customer'))
            else:
                template = loader.get_template('customer/account.html')
                context = {
                    'err': erro
                }
                return HttpResponse(template.render(context, request))
