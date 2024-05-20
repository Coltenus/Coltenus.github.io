<script setup>
import { ref } from 'vue';
import { getCookie } from '/src/common.js';

let _email = getCookie('email').split('@')[0];
const email = ref(_email);
</script>

<template>
    <div class="container rounded bg-color-3 box-1">
        <p>Welcome,</p><p>{{ email }}</p>
    </div>
    <br>
    <div class="container rounded bg-color-3 box-1">
        <p>To logout press <a href="logout" class="btn fg-color-3">this button</a></p>
    </div>
</template>