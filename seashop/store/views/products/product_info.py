from django.template import loader
from django.http import HttpResponse, HttpResponseRedirect
from store.models.products.productdetail import Productdetail
from store.models.products.product import Product
from django.urls import reverse
from django.views import View


class cart(View):
    def get(self, request, name):
        cart = request.session.get('cart')
        # request.session.clear()
        prt = Product.get_product_by_name(name)
        pro = Productdetail. get_size_product(name)
        user = request.session.get('customer_id')
        # print(len(cart))
        if not user:
            user = None
        template = loader.get_template('products/info.html')
        context = {
            'prt': prt,
            'pro': pro,
            'user': user,
            'count': len(cart)
        }
        return HttpResponse(template.render(context, request))

    def post(self, request, name):
        products = request.POST.get('pro')
        cart_ = request.session.get('cart')
        cart__ = {}
        q = int(request.POST.get('quatity'))
        s = request.POST.get('size')
        status = 0
        if cart_:
            for x in cart_:
                if x.get('product') == products and x.get('size') == s:
                    status = 1
                    break
                else:
                    status = 0
            if status == 1:
                for x in cart_:
                    if x.get('product') == products and x.get('size') == s:
                        x['quatity'] = x.get('quatity') + q
            else:
                cart__['product'] = products
                cart__['size'] = s
                cart__['quatity'] = q
                cart_.append(cart__)
        else:
            cart_ = []
            cart__['product'] = products
            cart__['size'] = s
            cart__['quatity'] = q
            cart_.append(cart__)
        request.session['cart'] = cart_
        return HttpResponseRedirect(reverse('index'))
