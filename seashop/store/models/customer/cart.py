from django.db import models
from .customers import Customer
from store.models.products.product import Product

class Cart(models.Model):
        customer=models.ForeignKey(Customer,on_delete=models.CASCADE)
        product= models.ForeignKey(Product,on_delete=models.CASCADE)
        size=models.CharField(max_length=10)
        amount=models.IntegerField
        
        
        
        
        def get_cart(request):
                cart_=request.GET.get('cart')
                for x in cart_:
                        cart=Cart(customer=request.get('customer'),product=x.get('product'),size=x.get('size'),amount=x.get('quatity'))
                        cart.save()