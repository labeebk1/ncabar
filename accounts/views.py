# accounts/views.py
from django.http import HttpResponse
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import random
import strings
# Useful imports later on:
# from django.contrib.auth.decorators import permission_required
# from django.contrib.auth.decorators import user_passes_test

@csrf_exempt
def login_view(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(username=username, password=password)
    import pdb; pdb.set_trace(); # Currently allow stuff to go through
    if user is not None:
        if user.is_active:
            login(request, user)
            return HttpResponse("<h2>Success!</h2>", status=200)
        else:
           return HttpResponse("<h2>Account is no longer active.</h2>", status=200)
    else:
        # Return an 'invalid login' error message.
        return HttpResponse("<h2>You must login to continue.</h2>", status=401)
 
@csrf_exempt
@require_http_methods(["GET"])
def logout_view(request):
    logout(request)
    return HttpResponse("<h2>You have successfully logged out!</h2>", status=200)

# @csrf_exempt
# @login_required
# @require_http_methods(["POST"])
# def create_view(request):
#     if not request.user.is_superuser:
#         return HttpResponse("Error! You are unautharized to create accounts.", status=200)
    
#     # New user data
#     username = request.POST.get('username')
#     email = request.POST.get('email')

@csrf_exempt
@login_required
@require_http_methods(["POST"])
def update_password(request):
    request.user.set_password(request.POST.get('new_password'))
    request.user.save()
    return HttpResponse("Success!", status=200)

@csrf_exempt
@login_required
@require_http_methods(["POST"])
def forgotten_password(request):

    # Retrieve account of email

    letters_numbers = string.ascii_letters + string.digits
    new_password = ''.join(random.choice(letters_numbers) for i in range(10))
    user.set_password(new_password)
    user.save()

    # Email him password here

    return HttpResponse("Success!", status=200)


@login_required
def test(request):
    return HttpResponse("You are seeing this while logged in!")