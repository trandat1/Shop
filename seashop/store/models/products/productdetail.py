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
        return products

    def get_size_product(name):
        product_ = Product.get_product_by_name(name)
        pro = Productdetail.objects.all().filter(product=product_.id)
        return pro
        