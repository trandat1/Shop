from django import template
from store.models.customer.addressdetail import Addressdetail
from django.utils.safestring import mark_safe
register = template.Library()


@register.filter(name='address')
def address(addr):
	result='{0} {1}{2}<br>{3}<br>{4}<br>{5}'.format(addr.first_Name,addr.last_Name,addr.company,addr.address,addr.province,addr.city)
	return mark_safe(result)
