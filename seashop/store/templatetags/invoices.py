from django import template

register = template.Library()


@register.filter(name='status')
def status(st):
    status_ = {'booked': 'Đã đặt hàng', 'success': 'Đã thanh toán',
               'wait': 'Chờ', 'return': 'trả hàng', 'revoke': 'hủy bỏ'}
    return status_.get(st)


@register.filter(name='total')
def total(invd):
    total = 0
    for x in invd:
        total = total+x.get('total_price')
    i = -1
    new_total_price = ''
    while total > 0:
        i += 1
        if i % 3 == 0:
            new_total_price = new_total_price+','+str(total % 10)
        else:
            new_total_price = new_total_price+str(total % 10)
        total = int(total/10)
    new_total_price = new_total_price.replace(',', '', 1)
    return new_total_price[::-1]


@register.filter(name='price')
def price(price):
    i = -1
    new_price = ''
    while price > 0:
        i += 1
        if i % 3 == 0:
            new_price = new_price+','+str(price % 10)
        else:
            new_price = new_price+str(price % 10)
        price = int(price/10)
    new_price = new_price.replace(',', '', 1)
    return new_price[::-1]


@register.filter(name='date_invoice')
def date_invoice(date):
    month = {1: 'Tháng Một', 2: 'Tháng Hai', 3: 'Tháng Ba',
             4: 'Tháng Bốn', 5: 'Tháng Năm', 6: 'Tháng Sáu', 
             7: 'Tháng Bảy',8: 'Tháng Tám', 9: 'Tháng 9', 
             10: 'Tháng Mười',11: 'Tháng Mười Một', 12: 'Tháng mười Hai'}
    return "{0} {1} {2}".format(date.day,month.get(date.month),date.year)
