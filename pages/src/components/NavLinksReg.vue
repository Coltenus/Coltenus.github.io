<script setup>
import { ref } from 'vue';
import { getCookie } from '/src/common.js';

let _email = getCookie('email').split('@')[0];
const email = ref(_email);
</script>

<template>
<a class="plc-1 nav-item nav-link" href="profile">{{email}}</a>
<a class="plc-1 nav-item nav-link" href="auth?type=logout">Logout</a>
</template>