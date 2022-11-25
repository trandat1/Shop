from django.template import loader
from django.urls import reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.views import View
from store.models.customer.addressdetail import Addressdetail


class Edit_address(View):
    def get(self, request):
        cus = request.session.get('customer_id')
        addr = Addressdetail.get_address_by_cus(cus)
        email = request.session.get('Email')
        template = loader.get_template('customer/edit_address.html')
        context = {
            'email': email,
            'addr': addr,
        }
        return HttpResponse(template.render(context, request))

    def post(self, request):
        cus = request.session.get('customer_id')
        fn = request.POST.get('billing_first_name')
        ln = request.POST.get('billing_last_name')
        cm = request.POST.get('billing_company')
        addr = request.POST.get('billing_address_1')
        pr = request.POST.get('billing_province')
        city = request.POST.get('billing_city')
        ph = request.POST.get('billing_phone')
        email = request.POST.get('billing_email')
        Addressdetail.set_address(cus, email, fn, ln, cm, addr, pr, ph, city)
        return HttpResponseRedirect(reverse('address'))
