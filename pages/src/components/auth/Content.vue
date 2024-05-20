<script setup>
import Register from "/src/components/auth/Register.vue";
import Login from "/src/components/auth/Login.vue";
import { createApp, ref } from "vue";

const params = new URLSearchParams(window.location.search);
let type = params.has("type") ? params.get("type") : "";
const change_text = ref('');
if(type === 'register') {
    change_text.value = 'To login';
}
else {
    change_text.value = 'To register';
}

function changeType() {
    if(type === 'register') {
        type = 'login';
        change_text.value = 'To register';
    }
    else {
        type = 'register';
        change_text.value = 'To login';
    }
}
</script>

<template>
<div v-if="type === 'register'">
    <Register />
</div>
<div v-else>
    <Login />
</div>
<div class="row box-3 mt-5">
    <div class="col">
        <button class="btn btn-1" @click="changeType">{{change_text}}</button>
    </div>
</div>
</template>