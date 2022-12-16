from django.urls import path
from .views.customer.login import Login
from .views import home
from .views.customer.register import Register
from .views.customer.customers import page_customer
from .views.products.product_info import cart
from .views.customer.cart import Cart
from .views.customer.pay import Pay
from .views.customer.my_account.update_account import Update_account
from .views.customer.my_account.invoices import invoices
from .views.customer.my_account.view_invoice import view_invoices
from .views.customer.my_account.edit_address import Edit_address



urlpatterns = [
    path('', home.index, name='index'),
    path('login', Login.as_view(), name='login'),
    path('register', Register.as_view(), name='register'),
    path('customer/', page_customer.index, name='customer'),
    path('logout', page_customer.logout, name='logout'),
    path('product=<str:name>', cart.as_view(), name='info'),
    path('cart', Cart.as_view(), name='cart'),
    path('remove', Cart.remove, name='remove'),
    path('pay',Pay.as_view(), name='pay'),
    path('customer/Update_account',Update_account.as_view(), name='update_account'),
    path('customer/invoice',invoices.as_view(), name='invoice'),
    path('customer/address/',page_customer.address,name='address'),
    path('customer/view_invoice/<int:id>',view_invoices.as_view(), name='view_invoice'),
    path('customer/address/edit-address',Edit_address.as_view(), name='edit_address'),
]
