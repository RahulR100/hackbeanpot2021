from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.core import serializers

import json

from .forms import CreateProductForm
from .models import Product

# Create your views here.
def home_view(request, *args, **kwargs):
	queryset = Product.objects.all()

	context = {
		'login_success': False if request.session.get('login_success') is None else request.session.get('login_success'),
		'data': json.dumps(serializers.serialise('qs', queryset))
	}

	if request.session.get('login_success') is not None:
		del request.session['login_success']

	return render(request, 'home.html', context)

def create_product_view(request, *args, **kwargs):
	form = CreateProductForm(request.POST or None)

	if form.is_valid():
		title 		= request.POST.get('title')
		thumbnail 	= request.POST.get('thumbnail')
		quantity 	= request.POST.get('quantity')
		price 		= request.POST.get('price')
		description = request.POST.get('description')
		tags 		= request.POST.get('tags')

		Product.objects.create(title=title,
							   thumbnail=thumbnail,
							   quantity=quantity,
							   price=price,
							   description=description,
							   tags=tags)

		return redirect('home')

	return render(request, 'sell.html', {})