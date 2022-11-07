from django import template

register = template.Library()


@register.filter(name='countprt')
def countprt(count):
    if count % 4 == 0:
        return True
   

