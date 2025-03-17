<template>
  <ul>
    <li v-if="isRegisterPage.isRegisterPage"><router-link to="/login">Login</router-link></li>
    <li v-else><router-link to="/register">Create account</router-link></li>
    <li  v-if="!isRegisterPage.isRegisterPage"><router-link to="/login/forgot-password">Forgot password?</router-link></li>
  </ul>
</template>

<script setup>
import { isRegisterPageValue } from "../../../store/RegisterPageBooleanValue";
const isRegisterPage = isRegisterPageValue();
</script>
