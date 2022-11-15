from django import template
from store.models.products.product import Product

register = template.Library()


@register.filter(name='countprt')
def countprt(count):
    if count % 4 == 0:
        return True
   
   
@register.filter(name='price')
def price(price):
    i=-1
    new_price=''
    while price>0:
        i+=1
        if i%3==0:
            new_price=new_price+','+str(price % 10)
        else:
            new_price=new_price+str(price % 10)
        price=int(price/10)
    new_price=new_price.replace(',','',1)
    return new_price[::-1]
        
    