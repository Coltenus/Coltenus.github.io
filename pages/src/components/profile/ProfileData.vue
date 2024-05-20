<script setup>
import { ref } from 'vue';
import { getCookie } from '/src/common.js';

const email = ref(getCookie('email'));
const gender = ref(getCookie('gender'));
const bdate = ref(getCookie('birthdate'));
const spent_time = ref(getCookie('spent_time'));
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
<button type="button" class="mb-3 mt-1 btn btn-1" id="clear-button">Clear spent time</button>
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
        <button class="btn btn-1" id="save-password-button">Change password</button>
    </div>
</div>
</template>