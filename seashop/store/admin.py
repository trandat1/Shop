from django.contrib import admin
from .models.products.product import Product
from .models.products.categories import category
from .models.products.sizes import Size
from .models.products.productdetail import Productdetail
from .models.products.categoriedetail import categorydetail
from .models.products.categorize import Categorize
from .models.customer.invoices import Invoice
class Products(admin.ModelAdmin):
    list_display = ['name', 'price', 'description']


class productdetail(admin.ModelAdmin):
    list_display = ['product', 'Category', 'size', 'quantity']


class Category(admin.ModelAdmin):
    list_display = ['name']

class categorize(admin.ModelAdmin):
    list_display = ['name']


class size(admin.ModelAdmin):
    list_display = ['size']


class Categorydetail(admin.ModelAdmin):
    list_display = ['Categorize','Product']


# Register your models here.
admin.site.register(Product, Products)
admin.site.register(category, Category)
admin.site.register(Size, size)
admin.site.register(Productdetail, productdetail)
admin.site.register(categorydetail, Categorydetail)
admin.site.register(Categorize,categorize)
