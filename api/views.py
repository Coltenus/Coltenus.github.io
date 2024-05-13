from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
import hashlib
from .models import User
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

load_dotenv()
USER_HASH_SECRET = str(os.getenv("USER_HASH_SECRET"))

def str_with_secret(s: str) -> str:
    return s + USER_HASH_SECRET

# Create your views here.

@csrf_exempt
def user(request):
    if request.method == "GET":
        if request.META.get('CONTENT_TYPE') == "application/json":
            json_data = json.loads(request.body)
            if json_data.get("email") == None or json_data.get("password") == None:
                return JsonResponse({"status": "error", "message": "Invalid request.", "user": None})
            users = User.objects.filter(email=json_data.get("email"))
            if len(users) != 1:
                return JsonResponse({"status": "error", "message": "User not found.", "user": None})
            user = users[0]
            if user.password_hash != hashlib.sha256(json_data.get("password").encode('utf-8')).hexdigest():
                return JsonResponse({"status": "error", "message": "Invalid password.", "user": None})
            user_response = {
                "email": user.email,
                "gender": user.gender,
                "birthdate": user.birthdate,
                "spent_time": user.spent_time,
            }
            return JsonResponse({"status": "success", "message": "User found.", "user": user_response})
        elif request.META.get('CONTENT_TYPE') == 'text/html' or request.META.get('CONTENT_TYPE') == 'text/plain':
            return JsonResponse({"message": "Make sure to set the Content-Type to application/json."})
        else:
            return JsonResponse({"message": "Invalid Content-Type."})
    else:
        return JsonResponse({"message": "Invalid request method."})
    
@csrf_exempt
def register(request):
    if request.method == "POST":
        if request.META.get('CONTENT_TYPE') == "application/json":
            json_data = json.loads(request.body)
            if json_data.get("email") == None or json_data.get("password1") == None or json_data.get("password2") == None:
                return JsonResponse({"status": "error", "message": "Invalid request."})
            if json_data.get("gender") == None or json_data.get("birthdate") == None:
                return JsonResponse({"status": "error", "message": "Invalid request."})
            if json_data.get("password1") != json_data.get("password2"):
                return JsonResponse({"status": "error", "message": "Passwords do not match."})
            if User.objects.filter(email=json_data.get("email")).exists():
                return JsonResponse({"status": "error", "message": "User already exists"})
            try:
                birthdate = datetime.strptime(json_data.get("birthdate"), "%Y-%m-%d")
            except ValueError:
                return JsonResponse({"status": "error", "message": "Invalid date format."})
            user_hash = hashlib.sha256(str_with_secret(json_data.get("email")).encode('utf-8')).hexdigest()
            password_hash = hashlib.sha256(json_data.get("password1").encode('utf-8')).hexdigest()
            try:
                gender = int(json_data.get("gender"))
                match gender:
                    case 1:
                        gender = 'Male'
                    case 2:
                        gender = 'Female'
                    case _:
                        gender = 'Other'
            except ValueError:
                gender = 'Other'
            user = User(
                user_hash = user_hash,
                email = json_data.get("email"),
                password_hash = password_hash,
                gender = gender,
                birthdate = birthdate,
            )
            user.save()
            return JsonResponse({"status": "success", "message": "User registered.", "user_hash": user_hash})
        else:
            return JsonResponse({"message": "Make sure to set the Content-Type to application/json."})
    else:
        return JsonResponse({"message": "Invalid request method."})
    
@csrf_exempt
def change_pass(request):
    if request.method == "POST":
        if request.META.get('CONTENT_TYPE') == "application/json":
            json_data = json.loads(request.body)
            if json_data.get("user_hash") == None or json_data.get("password") == None:
                return JsonResponse({"status": "error", "message": "Invalid request."})
            users = User.objects.filter(user_hash=json_data.get("user_hash"))
            if len(users) != 1:
                return JsonResponse({"status": "error", "message": "User not found."})
            user = users[0]
            user.password_hash = hashlib.sha256(json_data.get("password").encode('utf-8')).hexdigest()
            user.save()
            return JsonResponse({"status": "success", "message": "Password changed."})
        else:
            return JsonResponse({"message": "Make sure to set the Content-Type to application/json."})
    else:
        return JsonResponse({"message": "Invalid request method."})
    
@csrf_exempt
def update_spent_time(request):
    if request.method == "POST":
        if request.META.get('CONTENT_TYPE') == "application/json":
            json_data = json.loads(request.body)
            if json_data.get("user_hash") == None or json_data.get("spent_time") == None:
                return JsonResponse({"status": "error", "message": "Invalid request."})
            users = User.objects.filter(user_hash=json_data.get("user_hash"))
            if len(users) != 1:
                return JsonResponse({"status": "error", "message": "User not found."})
            user = users[0]
            try:
                time = datetime.strptime(json_data.get("spent_time"), "%H:%M:%S")
                spent_time = timedelta(hours=time.hour, minutes=time.minute, seconds=time.second)
            except ValueError:
                return JsonResponse({"status": "error", "message": "Invalid date format."})
            user.spent_time += spent_time
            user.save()
            return JsonResponse({"status": "success", "message": "Spent time updated."})
        else:
            return JsonResponse({"message": "Make sure to set the Content-Type to application/json."})
    else:
        return JsonResponse({"message": "Invalid request method."})
    
@csrf_exempt
def clear_spent_time(request):
    if request.method == "POST":
        if request.META.get('CONTENT_TYPE') == "application/json":
            json_data = json.loads(request.body)
            if json_data.get("user_hash") == None:
                return JsonResponse({"status": "error", "message": "Invalid request."})
            users = User.objects.filter(user_hash=json_data.get("user_hash"))
            if len(users) != 1:
                return JsonResponse({"status": "error", "message": "User not found."})
            user = users[0]
            user.spent_time = timedelta(0)
            user.save()
            return JsonResponse({"status": "success", "message": "Spent time cleared."})
        else:
            return JsonResponse({"message": "Make sure to set the Content-Type to application/json."})
    else:
        return JsonResponse({"message": "Invalid request method."})
    
@csrf_exempt
def login(request):
    if request.method == "POST":
        if request.META.get('CONTENT_TYPE') == "application/json":
            json_data = json.loads(request.body)
            if json_data.get("email") == None or json_data.get("password") == None:
                return JsonResponse({"status": "error", "message": "Invalid request."})
            users = User.objects.filter(email=json_data.get("email"))
            if len(users) != 1:
                return JsonResponse({"status": "error", "message": "User not found."})
            user = users[0]
            if user.password_hash != hashlib.sha256(json_data.get("password").encode('utf-8')).hexdigest():
                return JsonResponse({"status": "error", "message": "Invalid password."})
            return JsonResponse({"status": "success", "message": "User authenticated.", "user_hash": user.user_hash})
        else:
            return JsonResponse({"message": "Make sure to set the Content-Type to application/json."})
    else:
        return JsonResponse({"message": "Invalid request method."})