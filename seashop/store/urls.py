from django.urls import path
from .views.customer.login import Login
from .views import home
from .views.customer.register import Register
from .views.customer.customers import page_customer
from .views.products.product_info import cart
from .views.customer.cart import Cart

urlpatterns = [
    path('', home.index, name='index'),
    path('login', Login.as_view(), name='login'),
    path('register', Register.as_view(), name='register'),
    path('customer', page_customer.as_view(), name='customer'),
    path('product=<str:name>',cart.as_view(), name='info'),
    path('cart',Cart.as_view(), name='cart'),
]
