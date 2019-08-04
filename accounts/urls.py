# accounts/urls.py
from django.urls import path
from django.conf.urls import url
from accounts.views import *

urlpatterns = [
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('test/', test, name='test'),
    path('forgot_password/', forgot_password, name='forgot password'),
    path('update_password/', update_password, name='update password')
]
