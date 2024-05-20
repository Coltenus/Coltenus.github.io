<script setup>
import { ref } from 'vue';
import { getCookie, api_url, setCookie } from '/src/common.js';
import { sha256 } from "/src/common.js";

const email = ref(getCookie('email'));
const gender = ref(getCookie('gender'));
const bdate = ref(getCookie('birthdate'));
const spent_time = ref(getCookie('spent_time'));

function clear_button() {
    let result = confirm("Are you sure you want to clear your spent time?");
    if (result) {
        setCookie("spent_time", "0:00:00");
        spent_time.value = "0:00:00";
        fetch(api_url + "/clear-spent-time",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_hash: getCookie("user_hash"),
            }),
        }).then((response) => response.json())
        .then((data) => alert(data.message));
    }
}

function save_password() {
    if(getCookie("user_hash") === undefined || getCookie("user_hash") === "") {
        alert("You must be logged in to change your password");
        return;
    }
    var password1 = document.getElementById("password1").value;
    var password2 = document.getElementById("password2").value;
    if(password1 !== password2) {
        alert("Passwords do not match");
    }
    else if(password1 === "") {
        alert("Password cannot be empty");
    }
    else {
        fetch(api_url + "/change-pass",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_hash: getCookie("user_hash"),
                password: password1,
            }),
        }).then((response) => response.json())
        .then((data) => alert(data.message));
    }
}
</script>

<template>
<div class="row">
    <div class="col"><p>Email</p></div>
    <div class="col"><p>{{email}}</p></div>
</div>
<div class="row">
    <div class="col"><p>Gender</p></div>
    <div class="col"><p>{{gender}}</p></div>
</div>
<div class="row">
    <div class="col"><p>Birth date</p></div>
    <div class="col"><p>{{bdate}}</p></div>
</div>
<div class="row">
    <div class="col"><p>Spent time</p></div>
    <div class="col"><p>{{spent_time}}</p></div>
</div>
<button type="button" class="mb-3 mt-1 btn btn-1" id="clear-button" @click="clear_button">Clear spent time</button>
<form>
    <div class="input-group plc-1 prc-1 min-vw-65">
        <div class="form-floating mb-3">
            <input type="password" class="form-control input-1" id="password1" placeholder="password1">
            <label for="floatingInput">Password</label>
        </div>
        <div class="form-floating mb-3">
            <input type="password" class="form-control input-1" id="password2" placeholder="password2">
            <label for="floatingInput">Confirm password</label>
        </div>
    </div>
</form>
<div class="row mb-3">
    <div class="col">
        <button class="btn btn-1" id="save-password-button" @click="save_password">Change password</button>
    </div>
</div>
</template>