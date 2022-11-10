from django.template import loader
from django.http import HttpResponse, HttpResponseRedirect
from store.models.products.categories import category
from store.models.products.productdetail import Productdetail
from store.models.products.categoriedetail import categorydetail
from store.models.products.product import Product
from store.models.products.categorize import Categorize
from django.urls import reverse


def index(request):
    template = loader.get_template('index.html')
    category_name = request.GET.get('category')
    category_detail = request.GET.get('categorydetail')
    if category_name:
        prt = Productdetail.get_product_by_category_name(category_name)
    elif category_detail:
        prt = categorydetail.get_product_by_categorydetail_name(
            category_detail)
        if not prt:
            return HttpResponseRedirect(reverse('index'))
    else:
        prt = Product.get_all_products()
    user = request.session.get('customer_id')

    # if user:
    cart = request.session.get('cart')
    print(cart)
    #     if not cart:
    #         cart = []
    #         request.session['cart'] = []

    # else:
    #     cart = []

    if not user:
        user = None
    context = {
        'user': user,
        'prt': prt,
        'count': len(cart)
    }

    return HttpResponse(template.render(context, request))
