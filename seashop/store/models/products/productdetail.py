from django.db import models
from .categories import category
from .product import Product
from .sizes import Size


class Productdetail(models.Model):
    Category = models.ForeignKey(category, on_delete=models.CASCADE, default=1)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    size = models.ForeignKey(Size, on_delete=models.CASCADE, default=1)
    quantity = models.IntegerField(default=999)

    def get_product_by_category_name(category_name):
        products = []
        category_ = category.get_categoriesid_by_name(category_name)
        # print(category_)
        product_detail = Productdetail.objects.all().filter(Category=category_.id)
        for x in product_detail:
            products.append(x.product)
        products = set(products)
        products = list(products)
        return products

    def get_size_product(name):
        product_ = Product.get_product_by_name(name)
        pro = Productdetail.objects.all().filter(product=product_.id)
        return pro

    @staticmethod
    def get_product_by_id(id):
        return Productdetail.objects.all().get(id=id)

    @staticmethod
    def update_quatity(pr, size, quatity):
        pr_ = Product.get_product_by_id(pr)
        size_ = Size.get_size(size)
        prt_ = Productdetail.objects.all().get(product=pr_, size=size_)
        prt_.quantity = prt_.quantity-quatity
        if prt_.quantity < 1:
            pr_.status = 0
            pr.save()
        prt_.save()
