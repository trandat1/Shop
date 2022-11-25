from django.template import loader
from django.urls import reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.views import View


class Cart(View):
    def get(self, request):
        cart = request.session.get('cart')
        template = loader.get_template('customer/cart.html')
        print(cart)
        context = {
            'cart': cart,
            'count': len(cart)
        }
        return HttpResponse(template.render(context, request))

    def update(self, request):
        cart = request.session.get('cart')
        cart_ = []
        for x in cart:
            up = {}
            quatity = request.POST.get(
                'quatity{0}'.format(x.get('product')))
            up['product'] = x.get('product')
            up['quantity'] = quatity
            cart_.append(up)
        for x in cart_:
            for i in cart:
                if i.get('product') == x.get('product') and x.get('quantity'):
                    if int(x.get('quantity')) != 0:
                        i['quatity'] = x.get('quantity')
                    if int(x.get('quantity')) == 0:
                        cart.remove(i)
        for x in cart:
            x['quatity'] = int(x.get('quatity'))
        return cart

    def post(self, request):
        new_cart = Cart.update(self, request)
        request.session['cart'] = new_cart
        return HttpResponseRedirect(reverse('cart'))

    def remove(request):
        product = request.POST.get('product')
        cart = request.session.get('cart')
        for x in cart:
            if x.get('product') == product:
                cart.remove(x)
        request.session['cart'] = cart
        return HttpResponseRedirect(reverse('cart'))
