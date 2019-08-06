# accounts/urls.py
from django.urls import path
from django.conf.urls import url
from accounts.views import *

urlpatterns = [
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('logged_in/', logged_in, name='logged_in'),
    path('forgot_password/', forgot_password, name='forgot password'),
    path('update_password/', update_password, name='update password'),
    path('create_account/', create_view, name='create account')
]
