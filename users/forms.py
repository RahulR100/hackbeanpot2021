from django import forms
from django.forms import ValidationError

from .models import User

class UserRegisterForm(forms.ModelForm):
	class Meta:
		model = User
		fields = [
			'username',
			'first_name',
			'last_name',
			'password',
			'email',
			'phone_number',
			'address',
			'is_seller'
		]

class UserLoginForm(forms.ModelForm):
	class Meta:
		model = User
		fields = [
			'username',
			'password'
		]