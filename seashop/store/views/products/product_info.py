from django.template import loader
from django.http import HttpResponse, HttpResponseRedirect
from store.models.products.productdetail import Productdetail
from store.models.products.product import Product
from django.urls import reverse
from django.views import View


class cart(View):
    def get(self, request, name):
        request.session.clear()
        prt = Product.get_product_by_name(name)
        pro = Productdetail. get_size_product(name)
        template = loader.get_template('products/info.html')
        context = {
            'prt': prt,
            'pro': pro
        }
        return HttpResponse(template.render(context, request))

    def post(self, request, name):
        products = request.POST.get('pro')
        cart_ = request.session.get('cart')
        cart__ = {}
        if cart_:
            q = int(request.POST.get('quatity'))
            s = request.POST.get('size')
            for x in cart_:
                pass
            quatity = cart_.get(products)
            cart_['size'] = s
            if quatity:
                cart_[products] = quatity+q
            else:
                cart_[products] = 1
        else:
            cart_ = []
        #     cart_[products] = 1
        # request.session['cart'] = cart_
        print(cart_)
        return HttpResponseRedirect(reverse('index'))
