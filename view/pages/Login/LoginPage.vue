<template>
  <form>
    <h1>Login</h1>
    <EmailCamp />
    <PasswordCamp />
    <ul>
      <li v-if="messageRequire.messageRequire.appear">
        {{ messageRequire.messageRequire.message }}
      </li>
      <li>
        <button type="button" @click="back()">Cancel</button>
      </li>
      <li>
        <button type="button" @click="next()">Confirm</button>
      </li>
    </ul>
    <GoogleCamp />
    <ul>
      <li><router-link to="/register">Create account.</router-link></li>
      <li><router-link to="/">Forgot u password?</router-link></li>
    </ul>
  </form>
</template>

<script setup>
import EmailCamp from "./DefaultComponents/EmailCamp.vue";

import PasswordCamp from "./DefaultComponents/PasswordCamp.vue";

import GoogleCamp from "./DefaultComponents/GoogleCamp.vue";

import { messageRequireValue } from "../../store/MessageRequireValue";
const messageRequire = messageRequireValue();

import { emailValue } from "../../store/EmailValue";
const email = emailValue();

import { passwordValue } from "../../store/PasswordValue";
const password = passwordValue();

import { nameValue } from "../../store/NameValue";
const name = nameValue();

import { codeValue } from "../../store/CodeValue.js";
const code = codeValue();

import { useRouter } from "vue-router";
const router = useRouter();

import { onUnmounted } from "vue";

import { userLogin } from "../../../model/login_register_user-update/userLogin/userLogin.js";

onUnmounted(() => {
  code.code = "";
  code.codeString = "";
  name.name = undefined;
  password.password = undefined;
  email.email = undefined;
  messageRequire.messageRequire.appear = false;
  messageRequire.messageRequire.message = undefined;
});

async function next() {
  const logged = await userLogin();
  if (logged) {
    router.push("/");
  }
}

async function back() {
  router.push("/");
}
</script>
