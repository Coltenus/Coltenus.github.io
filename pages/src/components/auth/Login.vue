<script setup>
import { api_url, setCookie, sha256 } from "/src/common.js";

function login_button() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    if(email === "") {
        alert("Email cannot be empty");
    }
    else if(password === "") {
        alert("Password cannot be empty");
    }
    else {
        fetch(api_url + "/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
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
            <h2 class="text-center">Login</h2>
            <br>
            <div class="form-floating mb-3 box-4">
                <input type="email" class="form-control input-1" id="email" placeholder="name@example.com">
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating mb-3 box-4">
                <input type="password" class="form-control input-1" id="password" placeholder="password">
                <label for="floatingInput">Password</label>
            </div>
            <br>
        </form>
        <button type="submit" class="btn btn-1" id="login-button" @click="login_button">Log in</button>
    </div>
</div>
</template>