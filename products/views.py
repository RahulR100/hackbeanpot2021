from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def home_view(request, *args, **kwargs):
	context = {
		'login_success': False if request.session.get('login_success') is None else request.session.get('login_success'),
	}

	if request.session.get('login_success') is not None:
		del request.session['login_success']

	return render(request, 'home.html', {})