from django.urls import path
from . import views

urlpatterns = [
    path('user', views.user, name='user'),
    path('register', views.register, name='register'),
    path('change-pass', views.change_pass, name='change_pass'),
    path('update-spent-time', views.update_spent_time, name='update_spent_time'),
    path('clear-spent-time', views.clear_spent_time, name='clear_spent_time'),
    path('login', views.login, name='login_api'),
]