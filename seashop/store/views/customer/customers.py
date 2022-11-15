from django.template import loader
from django.urls import reverse
from django.http import HttpResponse, HttpResponseRedirect
from store.models.customer.cart import Cart
from store.models.products.categories import category


class page_customer():
    def index(request):
        cat = category.get_all_categories()
        cus = request.session.get('Username')
        cart = request.session.get('cart')
        if not cart:
            cart = []
            request.session['cart'] = []
        if cus:
            template = loader.get_template('customer/customer.html')
            context = {
                'user': cus,
                'cat': cat,
                'count': len(cart)
            }
            return HttpResponse(template.render(context, request))
        else:
            return HttpResponseRedirect(reverse('index'))

    def logout(request):
        cus = request.session['customer_id']
        cart = request.session.get('cart')
        
        if cart != Cart.get_cart_by_cusId(cus):
            Cart.delete_cart_by_cusId(cus)
            Cart.set_cart(cart)
        
        request.session.clear()
        return HttpResponseRedirect(reverse('customer'))
