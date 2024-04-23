from datetime import datetime
from django.views.generic import TemplateView
from .models import User
from django.shortcuts import redirect
from .forms import RegisterForm, LoginForm, ChangePasswordForm
import hashlib
from django.shortcuts import render

# Create your views here.
# 
# hashlib.sha256(str.encode('utf8')).hexdigest()

class IndexView(TemplateView):
    template_name = "lab3/index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_access"] = True
        user_hash = self.request.COOKIES.get("user_hash")
        if user_hash != None and len(User.objects.filter(user_hash=user_hash)) != 1:
            self.response.delete_cookie("user_hash")
            user_hash = None
        context["hash"] = user_hash
        if user_hash != None:
            users = User.objects.filter(user_hash=user_hash)
            if len(users) == 1:
                context["email"] = users[0].email.split("@")[0]
        return context

class ProfileView(TemplateView):
    template_name = "lab3/profile.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_access"] = True
        context["form"] = ChangePasswordForm()
        user_hash = self.request.COOKIES.get("user_hash")
        if user_hash != None and len(User.objects.filter(user_hash=user_hash)) != 1:
            self.response.delete_cookie("user_hash")
            user_hash = None
        context["hash"] = user_hash
        if user_hash != None:
            users = User.objects.filter(user_hash=user_hash)
            if len(users) == 1:
                context["email"] = users[0].email
                context["gender"] = users[0].gender
                context["bdate"] = users[0].birthdate
                context["spent_time"] = users[0].spent_time
        return context

class AboutView(TemplateView):
    template_name = "lab3/about.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_access"] = False
        user_hash = self.request.COOKIES.get("user_hash")
        if user_hash != None and len(User.objects.filter(user_hash=user_hash)) != 1:
            self.response.delete_cookie("user_hash")
            user_hash = None
        context["hash"] = user_hash
        if user_hash != None:
            users = User.objects.filter(user_hash=user_hash)
            if len(users) == 1:
                context["email"] = users[0].email.split("@")[0]
        return context

class TimekeepView(TemplateView):
    template_name = "lab3/timekeep.html"
    
    def get(self, request):
        if request.COOKIES.get("user_hash") == None:
            return redirect('login')
        context = {}
        context["page_access"] = True
        user_hash = self.request.COOKIES.get("user_hash")
        if user_hash != None and len(User.objects.filter(user_hash=user_hash)) != 1:
            self.response.delete_cookie("user_hash")
            user_hash = None
        context["hash"] = user_hash
        if user_hash != None:
            users = User.objects.filter(user_hash=user_hash)
            if len(users) == 1:
                context["email"] = users[0].email.split("@")[0]
        return render(request, self.template_name, context)

class LoginView(TemplateView):
    template_name = "lab3/login.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_access"] = False
        context["form"] = LoginForm()
        return context

class RegisterView(TemplateView):
    template_name = "lab3/register.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_access"] = False
        context["form"] = RegisterForm()
        return context
    
def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            if form.cleaned_data["password1"] != form.cleaned_data["password2"]:
                return redirect('register')
            gender = form.cleaned_data["gender"]
            match gender:
                case "1":
                    gender = 'Male'
                case "2":
                    gender = 'Female'
                case "_":
                    gender = 'Other'
            user_hash = hashlib.sha256(str.encode(form.cleaned_data["email"])).hexdigest()
            user = User(
                email = form.cleaned_data["email"],
                password_hash = hashlib.sha256(str.encode(form.cleaned_data["password1"])).hexdigest(),
                gender = gender,
                birthdate = form.cleaned_data["birthdate"],
                user_hash = user_hash,
            )
            user.save()
            response = redirect('login')
            return response
    return redirect('register')
    
def auth(request):
    response = redirect('login')
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            users = User.objects.filter(email=form.cleaned_data["email"])
            if len(users) != 1 or users[0].email != form.cleaned_data["email"] or users[0].password_hash != hashlib.sha256(str.encode(form.cleaned_data["password"])).hexdigest():
                return response
            response = redirect('index')
            user_hash = users[0].user_hash
            response.set_cookie("user_hash", user_hash)
    return response
    
def change_pass(request):
    if request.method == 'POST':
        form = ChangePasswordForm(request.POST)
        if form.is_valid():
            if form.cleaned_data["password1"] != form.cleaned_data["password2"]:
                return redirect('profile')
            user_hash = request.COOKIES.get("user_hash")
            if user_hash == None:
                return redirect('profile')
            users = User.objects.filter(user_hash=user_hash)
            if len(users) != 1:
                response = redirect('profile')
                response.delete_cookie("user_hash")
                return response
            if users[0].password_hash == hashlib.sha256(str.encode(form.cleaned_data["password1"])).hexdigest():
                return redirect('profile')
            users[0].password_hash = hashlib.sha256(str.encode(form.cleaned_data["password1"])).hexdigest()
            users[0].save()
    return redirect('profile')

def logout(request):
    response = redirect('index')
    response.delete_cookie("user_hash")
    return response