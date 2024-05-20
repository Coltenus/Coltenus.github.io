<script setup>
import {setCookie, api_url} from "/src/common.js";

function register_button() {
        var email = document.getElementById("email").value;
        var password1 = document.getElementById("password1").value;
        var password2 = document.getElementById("password2").value;
        var gender = document.getElementById("gender").value;
        var birthdate = document.getElementById("bdate").value;
        if(password1 !== password2) {
            alert("Passwords do not match");
        }
        else if(email === "") {
            alert("Email cannot be empty");
        }
        else if(password1 === "") {
            alert("Password cannot be empty");
        }
        else if(gender === "Select gender") {
            alert("Please select gender");
        }
        else if(birthdate === "") {
            alert("Please enter birthdate");
        }
        else {
            fetch(api_url + "/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password1: password1,
                    password2: password2,
                    gender: gender,
                    birthdate: birthdate,
                }),
            }).then((response) => response.json())
            .then((data) => {
                alert(data.message);
                if(data.user_hash !== undefined) {
                    setCookie("user_hash", data.user_hash);
                    window.location.replace("index");
                }
            });
        }
    }
</script>

<template>
<div class="row box-3">
    <div class="col">
        <form>
            <h2 class="text-center">Registration</h2>
            <div class="form-floating mt-5 mb-3 box-4">
                <input type="email" class="form-control input-1" id="email" placeholder="name@example.com">
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating mt-3 mb-3 box-4">
                <input type="password" class="form-control input-1" id="password1" placeholder="password1">
                <label for="floatingInput">Password</label>
            </div>
            <div class="form-floating mb-3 box-4">
                <input type="password" class="form-control input-1" id="password2" placeholder="password2">
                <label for="floatingInput">Confirm password</label>
            </div>
            <div class="form-floating mb-3 label-1 box-4">
                <select class="form-select input-1" id="gender">
                    <option selected disabled="true">Select gender</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Other</option>
                </select>
                <label class="label-1" for="floatingSelect">Gender</label>
            </div>
            <div class="form-floating mb-3 label-1 box-4">
                <input type="date" class="form-control input-1" id="bdate" placeholder="bdate">
                <label for="floatingInput">Birth date</label>
            </div>
        </form>
        <button type="submit" class="btn btn-1 mt-5" id="register-button" @click="register_button">Register</button>
    </div>
</div>
</template>