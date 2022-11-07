from django import template

register = template.Library()


@register.filter(name='countprt')
def countprt(count, prt):
    if count % 5 == 0:
        return True
#     if count>4 and count % 4 < 4 and count % 4!=0:
#         return True
    if len(prt) % 4 != 0:
        return False
