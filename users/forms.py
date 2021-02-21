from django import forms

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
