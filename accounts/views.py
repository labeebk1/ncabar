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
# Useful imports later on:
# from django.contrib.auth.decorators import permission_required
# from django.contrib.auth.decorators import user_passes_test
# @csrf_exempt

@csrf_exempt
@require_http_methods(["POST"])
def login_view(request):
    username = request.GET.get('username') # why is it in the GET Request header?
    password = request.GET.get('password')
    user = authenticate(username=username, password=password)
    if user is not None:
        if user.is_active:
            login(request, user)
            return JsonResponse({'result': 'success'}, status=200)
        else:
            return JsonResponse({'result': 'inactive account'}, status=200)
    else:
        # Return an 'invalid login' error message.
        return JsonResponse({'result': 'invalid credentials'}, status=401)
 
@csrf_exempt
@require_http_methods(["GET"])
def logout_view(request):
    logout(request)
    return JsonResponse({'result': 'success'}, status=200)

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
    request.user.set_password(request.GET.get('new_password'))
    request.user.save()
    return JsonResponse({'result': 'success'}, status=200)

@csrf_exempt
@require_http_methods(["POST"])
def forgot_password(request):
    # Retrieve user from request
    email = request.GET.get('email')
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return JsonResponse({'result': 'email not found'}, status=404)

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
        return JsonResponse({'result': 'failed to send email'}, status=503)

    return JsonResponse({'result': 'success'}, status=200)

@csrf_exempt
@login_required
def test(request):
    return JsonResponse({'test': 'test'}, status=200)