from django.template import loader
from django.urls import reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.views import View
from django.template import loader
from store.models.customer.customers import Customer
from store.views.check.check_account import Check_Validate


class Register(View):
    def get(self, request):
        template = loader.get_template('customer/register.html')
        return HttpResponse(template.render({}, request))

    def post(self, request):
        username = request.POST.get('userName')
        email = request.POST.get('email')
        password = request.POST.get('password')
        repassword = request.POST.get('repassword')
        erro = Check_Validate.validate(username, email, password, repassword)
        if not erro["email"] and not erro["password"] and not erro["username"]:
            Customer.set_customer(username, email, password)
            return HttpResponseRedirect(reverse('login'))
        else:
            template = loader.get_template('customer/register.html')
            context = {
                'erro': erro
            }
            return HttpResponse(template.render(context, request))
