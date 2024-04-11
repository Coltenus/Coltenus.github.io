from django.urls import path
from . import views

urlpatterns = [
    path("", views.IndexView.as_view(), name="index"),
    path("index", views.IndexView.as_view(), name="index"),
    path("profile", views.ProfileView.as_view(), name="profile"),
    path("about", views.AboutView.as_view(), name="about"),
    path("timekeep", views.TimekeepView.as_view(), name="timekeep"),
    path("login", views.LoginView.as_view(), name="login"),
    path("register", views.RegisterView.as_view(), name="register"),
]