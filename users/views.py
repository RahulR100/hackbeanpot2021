from django.shortcuts import render

from .forms import UserRegisterForm
from .models import User

# Create your views here.
def register_view(request, *args, **kwargs):
	form = UserRegisterForm(request.POST or None)
	if form.is_valid():
		form.save()

	context = {
		'form': form
	}

	return render(request, 'register.html', context)

def login_view(request, *args, **kwargs):
	return render(request, 'login.html', {})