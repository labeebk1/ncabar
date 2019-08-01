# accounts/views.py
from django.http import HttpResponse
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

# Useful imports later on:
# from django.contrib.auth.decorators import permission_required
# from django.contrib.auth.decorators import user_passes_test
# @login_required

@csrf_exempt
def login_view(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(username=username, password=password)
    if user is not None:
        if user.is_active:
            login(request, user)
            return HttpResponse("<h2>Success!</h2>", status=200)
        else:
           return HttpResponse("<h2>Account is no longer active.</h2>", status=200)
    else:
        return HttpResponse("<h2>You must login to continue.</h2>", status=401)
        # Return an 'invalid login' error message.
 
@csrf_exempt
@require_http_methods(["GET"])
def logout_view(request):
    logout(request)
    return HttpResponse("<h2>You have successfully logged out!</h2>", status=200)

@login_required
def test(request):
    return HttpResponse("You are seeing this while logged in!")