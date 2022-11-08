from django import template

register = template.Library()

@register.filter(name="showcart")

def showcart(cart):
        pass