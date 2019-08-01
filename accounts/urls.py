# accounts/urls.py
from django.urls import path
from django.conf.urls import url
from accounts.views import login_view, logout_view, test

urlpatterns = [
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('test/', test, name='test'),
]
