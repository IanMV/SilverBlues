<template>
  <p id="emailCamp">
    <input type="text" v-model="email.email" placeholder="Email..." />
  </p>
</template>

<script setup>
import { emailValue } from "../../../store/EmailValue";
const email = emailValue();
</script>
