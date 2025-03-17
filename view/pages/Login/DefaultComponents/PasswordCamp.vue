<template>
  <p id="passwordCamp">
    <input type="text" v-model="password.password" placeholder="Password.." />
  </p>
</template>

<script setup>
import { passwordValue } from "../../../store/PasswordValue";
const password = passwordValue();
</script>
