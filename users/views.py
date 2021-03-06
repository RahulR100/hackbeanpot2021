from django.shortcuts import render, redirect
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login

from .forms import UserRegisterForm, UserLoginForm
from .models import User

# Create your views here.
def register_view(request, *args, **kwargs):
	form = UserRegisterForm(request.POST or None)
	
	if form.is_valid():
		username 		= request.POST.get('username')
		first_name 		= request.POST.get('first_name')
		last_name 		= request.POST.get('last_name')
		password 		= make_password(request.POST.get('password'))
		email 			= request.POST.get('email')
		phone_number 	= request.POST.get('phone_number')
		address 		= request.POST.get('address')
		is_seller 		= False if request.POST.get('is_seller') is None else True

		User.objects.create(username=username,
							first_name=first_name,
							last_name=last_name,
							password=password,
							email=email,
							phone_number=phone_number,
							address=address,
							is_seller=is_seller)

		request.session['login_success'] = True
		return redirect('home')

	return render(request, 'register.html', {})

def login_view(request, *args, **kwargs):
	form = UserLoginForm(request.POST or None)
	
	if request.method == "POST":
		username = request.POST.get('username')
		password = request.POST.get('password')

		user = authenticate(request,
							username=username,
							password=password)

		if user is not None:
			request.session['login_success'] = True
			login(request, user)

			if request.GET.get('next') is not None:
				return redirect(request.GET.get('next'))
			else:
				return redirect('home')
		else:
			request.session['login_success'] = False

	context = {
		'form': form,
		'status': request.session.get('login_success')
	}

	if request.session.get('login_success') is not None:
		del request.session['login_success']

	return render(request, 'login.html', context)
