from django import template
from store.models.products.product import Product


register = template.Library()


@register.filter(name="nameproduct")
def nameproduct(cart):
    product = Product.get_product_by_id(cart.get('product'))
    return product.name


@register.filter(name="imgproduct")
def imgproduct(cart):
    product = Product.get_product_by_id(cart.get('product'))
    return product.image


@register.filter(name="priceproduct")
def priceproduct(cart):
    product = Product.get_product_by_id(cart.get('product'))
    price = product.price
    new_price = ''
    i = -1
    while price > 0:
        i += 1
        if i % 3 == 0:
            new_price = new_price+','+str(price % 10)
        else:
            new_price = new_price+str(price % 10)
        price = int(price/10)
    new_price=(new_price.replace(',','',1))
    return new_price[::-1]


@register.filter(name="totalprice")
def totalprice(cart):
    product = Product.get_product_by_id(cart.get('product'))
    total = cart.get('quatity')*product.price
    new_total = ''
    i = -1
    while total > 0:
        i += 1
        if i % 3 == 0:
            new_total = new_total+','+str(total % 10)
        else:
            new_total = new_total+str(total % 10)
        total = int(total/10)
    new_total=(new_total.replace(',','',1))
    return new_total[::-1]


@register.filter(name="total")
def total(cart):
    total = 0
    for x in cart:
        product = Product.get_product_by_id(x.get('product'))
        total = total+x.get('quatity')*product.price
    new_total = ''
    i = -1
    while total > 0:
        i += 1
        if i % 3 == 0:
            new_total = new_total+','+str(total % 10)
        else:
            new_total = new_total+str(total % 10)
        total = int(total/10)
    new_total=(new_total.replace(',','',1))
    return new_total[::-1]
#     totalprice()
