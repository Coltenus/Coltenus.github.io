from django.views.generic import TemplateView

# Create your views here.

class IndexView(TemplateView):
    template_name = "lab3/index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_access"] = True
        return context

class ProfileView(TemplateView):
    template_name = "lab3/profile.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_access"] = True
        return context

class AboutView(TemplateView):
    template_name = "lab3/about.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_access"] = False
        return context

class TimekeepView(TemplateView):
    template_name = "lab3/timekeep.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_access"] = True
        return context

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