from traceback import print_tb
from django.db import models
from .categories import category
from .product import Product
from .categorize import Categorize


class categorydetail(models.Model):
    Category = models.ForeignKey(category, on_delete=models.CASCADE)
    Categorize = models.ForeignKey(
        Categorize, on_delete=models.CASCADE, default=1)
    Product = models.ForeignKey(Product, on_delete=models.CASCADE, default=1)

    def get_product_by_categorydetail_name(name):
        products = []
        categorize_ = Categorize.get_by_name(name)
        print(categorize_)
        if categorize_:
            product_detail = categorydetail.objects.all().filter(Categorize=categorize_.id)
            for x in product_detail:
                products.append(x.Product)
        # print(products)
            return products
        else:
            return None
