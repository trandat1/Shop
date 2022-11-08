from django import template
from store.models.products.product import Product



register = template.Library()

@register.filter(name="nameproduct")
def nameproduct(cart):
        product=Product.get_product_by_id(cart.get('product'))
        return product.name


@register.filter(name="imgproduct")
def imgproduct(cart):
        product=Product.get_product_by_id(cart.get('product'))
        return product.image

@register.filter(name="priceproduct")
def priceproduct(cart):
        product=Product.get_product_by_id(cart.get('product'))
        return product.price

@register.filter(name="totalprice")
def totalprice(cart):
        product=Product.get_product_by_id(cart.get('product'))
        total=cart.get('quatity')*product.price
        return total
        