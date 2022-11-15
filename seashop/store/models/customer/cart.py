from django.db import models
from .customers import Customer
from store.models.products.product import Product


class Cart(models.Model):
    customer = models.CharField(max_length=255)
    product = models.CharField(max_length=255)
    size = models.CharField(max_length=10)
    amount = models.IntegerField(default=999)

    @staticmethod
    def set_cart(cart):
        cart_ = cart
        for x in cart_:
            cart = Cart(customer=x.get('customer'), product=x.get(
                'product'), size=x.get('size'), amount=x.get('quatity'))
            cart.save()

    @staticmethod
    def get_cart_by_cusId(id):
        cart = Cart.objects.all().filter(customer=id)
        cart_ = []
        for x in cart:
            cart__ = {}
            cart__['customer'] = x.customer
            cart__['product'] = x.product
            cart__['size'] = x.size
            cart__['quatity'] = x.amount
            cart_.append(cart__)
        return cart_
    
    @staticmethod
    def delete_cart_by_cusId(cusId):
        cart=Cart.objects.all().filter(customer=cusId)
        cart.delete()
        
    # @staticmethod
    # def get_cart_by_login():
    #     return
