# accounts/views.py
from django.http import HttpResponse, JsonResponse
from django.core.mail import send_mail
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

import random
import string
import json
# Useful imports later on:
# from django.contrib.auth.decorators import permission_required
# from django.contrib.auth.decorators import user_passes_test
# @csrf_exempt

@csrf_exempt
@require_http_methods(["POST"])
def login_view(request):
    email = request.GET.get('email')
    password = request.GET.get('password')
    # import pdb; pdb.set_trace();
    user = authenticate(username=email, password=password)
    if user is not None:
        if user.is_active:
            login(request, user)
            return JsonResponse({'result': 'LOGIN_SUCCESS'}, status=200)
        else:
            return JsonResponse({'result': 'LOGIN_FAILURE'}, status=200)
    else:
        # Return an 'invalid login' error message.
        return JsonResponse({'result': 'LOGIN_FAILURE'}, status=200)
 
@csrf_exempt
@login_required
@require_http_methods(["GET"])
def logout_view(request):
    logout(request)
    return JsonResponse({'result': 'success'}, status=200)

@csrf_exempt
@require_http_methods(["POST"])
def create_view(request):
    # New user data
    data = json.loads(request.body)
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    password = data.get('password')
    try:
        user = User.objects.get(email=email)
        return JsonResponse({'result': 'REGISTER_FAILURE'}, status=200)
    except User.DoesNotExist:
        user = User.objects.create_user(
            username=email,
            email=email,
            password=password
            )
        user.save()
        if user:
            return JsonResponse({'result': 'REGISTER_SUCCESS'}, status=200)

@csrf_exempt
@login_required
@require_http_methods(["POST"])
def update_password(request):
    request.user.set_password(request.GET.get('new_password'))
    request.user.save()
    return JsonResponse({'result': 'success'}, status=200)

@csrf_exempt
@require_http_methods(["POST"])
def forgot_password(request):
    # Retrieve user from request
    data = json.loads(request.body)
    email = data.get('email')
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return JsonResponse({'result': 'EMAIL_DOES_NOT_EXIST'}, status=200)

    # Generate new random password
    letters_numbers = string.ascii_letters + string.digits
    new_password = ''.join(random.choice(letters_numbers) for i in range(10))
    
    # Message
    message = """
    Dear {email},

    Your account password is: {new_password}.

    For security reasons, please change the password at: https://ncabargroup.com. 

    Note: Do not reply to this email. If you did not make this request, please contact labeebk1@gmail.com.
    

    Best regards,
    NCA Bar Tutoring Group
    """.format(email=email, new_password=new_password)
    # Retrieve account of email
    send_mail(
        subject='Your Account Password',
        message=message,
        from_email='labeeb2k@gmail.com',
        recipient_list=[email],
        fail_silently=False,
    )

    # If email sent - update password
    if send_mail:
        user.set_password(new_password)
        user.save()
    else: 
        # Send error response 503 - Service Unavailable
        return JsonResponse({'result': 'EMAIL_SERVICE_UNAVAILABLE'}, status=503)
    return JsonResponse({'result': 'EMAIL_EXISTS_SUCCESS'}, status=200)

@csrf_exempt
def logged_in(request):
    if request.user.is_anonymous:
        return JsonResponse({'result': 'LOGGED_OUT'}, status=200)
    return JsonResponse({'result': 'LOGGED_IN'}, status=200)