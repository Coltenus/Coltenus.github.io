from datetime import datetime
from typing import Any
from django.http.response import HttpResponse as HttpResponse
from django.views.generic import TemplateView
from api.models import User
from django.shortcuts import redirect
import hashlib
from django.shortcuts import render

# Create your views here.


class IndexView(TemplateView):
    template_name = "lab3/index.html"

    def render_to_response(self, context: dict[str, Any], **response_kwargs: Any) -> HttpResponse:
        response = super().render_to_response(context, **response_kwargs)
        if context["hash"] != None and len(User.objects.filter(user_hash=context["hash"])) != 1:
            response.delete_cookie("user_hash")
            context["hash"] = None
        return response

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_access"] = True
        user_hash = self.request.COOKIES.get("user_hash")
        context["hash"] = user_hash
        if user_hash != None:
            users = User.objects.filter(user_hash=user_hash)
            if len(users) == 1:
                context["email"] = users[0].email.split("@")[0]
        return context
    
    def get(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)
        return self.render_to_response(context)

class ProfileView(TemplateView):
    template_name = "lab3/profile.html"

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
                context["email"] = users[0].email
                context["gender"] = users[0].gender
                context["bdate"] = users[0].birthdate
                context["spent_time"] = users[0].spent_time
                context["password_hash"] = users[0].password_hash
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
        return context

class RegisterView(TemplateView):
    template_name = "lab3/register.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_access"] = False
        return context

def logout(request):
    response = redirect('index')
    response.delete_cookie("user_hash")
    return response