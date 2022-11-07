from django.template import loader
from django.urls import reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.views import View
from django.template import loader
import hashlib
from store.models.customer.customers import Customer


class Register(View):
    def get(self, request):
        template = loader.get_template('customer/register.html')
        return HttpResponse(template.render({}, request))

    def validate(u, e, p, r):
        erro = {'email': None, 'username': None, 'password': None}
        cout = 0
        cout1 = 0
        if 8 < len(p) < 16:
            for x in p:
                if x.isnumeric():
                    cout += 1
                if x.islower():
                    cout += 1
                if x.isupper():
                    cout += 1
                if x.isspace():
                    cout += 1
            for x in range(33, 48):
                if chr(x) in p:
                    cout1 += 1
            for x in range(58, 65):
                if chr(x) in p:
                    cout1 += 1
            for x in range(91, 97):
                if chr(x) in p:
                    cout1 += 1
            for x in range(124, 127):
                if chr(x) in p:
                    cout1 += 1
        if len(p) < 8 or len(p) > 16 or cout < 4 or cout1 == 0:
            erro['password'] = "Password is 8-16 characters long with uppercase,number, lowercase and special and not space"

        if Customer.objects.filter(email=e):
            erro['email'] = "Email is already in use"
        elif Customer.objects.filter(Username=u):
            erro['username'] = "User is already in use"

        elif r != p:
            erro['password'] = "password incorrect"
        return erro

    def post(self, request):
        username = request.POST.get('userName')
        email = request.POST.get('email')
        password = request.POST.get('password')
        repassword = request.POST.get('repassword')
        erro = Register.validate(username, email, password, repassword)
        if not erro["email"] and not erro["password"] and not erro["username"]:
            Customer.set_customer(username, email, password)
            return HttpResponseRedirect(reverse('login'))
        else:
            template = loader.get_template('customer/register.html')
            context = {
                'erro': erro
            }
            return HttpResponse(template.render(context, request))
