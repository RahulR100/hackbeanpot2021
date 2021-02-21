from django.shortcuts import render
from django.contrib.auth.hashers import make_password

from .forms import UserRegisterForm
from .models import User

# Create your views here.
def register_view(request, *args, **kwargs):
	form = UserRegisterForm(request.POST or None)
	if form.is_valid():
		username = request.POST.get('username')
		first_name = request.POST.get('first_name')
		last_name = request.POST.get('last_name')
		password = make_password(request.POST.get('password'))
		email = request.POST.get('email')
		phone_number = request.POST.get('phone_number')
		address = request.POST.get('address')
		is_seller = False if request.POST.get('is_seller') == None else True

		User.objects.create(username=username,
							first_name=first_name,
							last_name=last_name,
							password=password,
							email=email,
							phone_number=phone_number,
							address=address,
							is_seller=is_seller)

	return render(request, 'register.html', {})

def login_view(request, *args, **kwargs):
	return render(request, 'login.html', {})