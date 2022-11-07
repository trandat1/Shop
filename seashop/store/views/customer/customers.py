from django.template import loader
from django.urls import reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.views import View
from store.models.products.categories import category

import hashlib


class page_customer(View):
    def get(self, request):
        cat = category.get_all_categories()
        cus = request.session.get('Username')
        if cus:
            template = loader.get_template('customer/customer.html')
            context = {
                'user': cus,
                'cat': cat
            }
            return HttpResponse(template.render(context, request))
        else:
            return HttpResponseRedirect(reverse('index'))
