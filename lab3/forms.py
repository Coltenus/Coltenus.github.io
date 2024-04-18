from django import forms

class RegisterForm(forms.Form):
    email = forms.EmailField(widget=forms.EmailInput(attrs={"class":"form-control input-1", "placeholder": "name@example.com"}))
    password1 = forms.CharField(widget=forms.PasswordInput(attrs={"class":"form-control input-1", "placeholder": "password1"}))
    password2 = forms.CharField(widget=forms.PasswordInput(attrs={"class":"form-control input-1", "placeholder": "password2"}))
    gender = forms.ChoiceField(choices=(("1", "Male"), ("2", "Female"), ("1", "Other")), widget=forms.Select(attrs={"class":"form-select input-1", "placeholder": "gender"}))
    birthdate = forms.DateField(widget=forms.SelectDateWidget(attrs={"class":"form-control input-1", "placeholder": "bdate"}))

class LoginForm(forms.Form):
    email = forms.EmailField(widget=forms.EmailInput(attrs={"class":"form-control input-1", "placeholder": "name@example.com"}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={"class":"form-control input-1", "placeholder": "password"}))

class ChangePasswordForm(forms.Form):
    password1 = forms.CharField(widget=forms.PasswordInput(attrs={"class":"form-control input-1", "placeholder": "password1"}))
    password2 = forms.CharField(widget=forms.PasswordInput(attrs={"class":"form-control input-1", "placeholder": "password2"}))