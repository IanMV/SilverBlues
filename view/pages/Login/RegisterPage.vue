<template>
  <form>
    <h1>Register</h1>
    <EmailCamp v-if="!steps.two" />
    <CodeEmailCamp v-if="steps.two && !steps.three" />
    <p v-if="steps.three" id="nameCamp">
      <input type="text" v-model="name.name" placeholder="Name..." />
    </p>
    <PasswordCamp v-if="steps.three" />
    <ul>
      <li v-if="messageRequire.messageRequire.appear">
        {{ messageRequire.messageRequire.message }}
      </li>
      <li>
        <button type="button" @click="back()">{{ cancel }}</button>
      </li>
      <li>
        <button type="button" @click="next()">{{ confirm }}</button>
      </li>
      <li v-if="steps.two && !steps.three">
        <button
          type="button"
          @click="
            async () => {
              const resent = await resendEmailVerificationCode();
              if (resent) {
                messageRequire.messageRequire.appear = false;
                messageRequire.messageRequire.message = undefined;
              }
            }
          "
        >
          Resend the code.
        </button>
      </li>
    </ul>
    <GoogleCamp />
  </form>
</template>

<script setup>
import EmailCamp from "./DefaultComponents/EmailCamp.vue";
import PasswordCamp from "./DefaultComponents/PasswordCamp.vue";
import GoogleCamp from "./DefaultComponents/GoogleCamp.vue";
import CodeEmailCamp from "./RegisterComponents/CodeEmailCamp.vue";

import { computed, reactive, onUnmounted } from "vue";

import { nameValue } from "../../store/NameValue";
const name = nameValue();

import { useRouter } from "vue-router";
const router = useRouter();

import { emailValue } from "../../store/EmailValue.js";
const email = emailValue();

import { passwordValue } from "../../store/PasswordValue.js";
const password = passwordValue();

import { messageRequireValue } from "../../store/MessageRequireValue.js";
const messageRequire = messageRequireValue();

import { codeExistenceCheck } from "../../../model/login_register_user-update/userRegister/codeExistenceCheck.js";
import { emailVerification } from "../../../model/login_register_user-update/userRegister/emailVerification.js";
import { resendEmailVerificationCode } from "../../../model/login_register_user-update/userRegister/resendEmailVerificationCode.js";
import { userRegister } from "../../../model/login_register_user-update/userRegister/userRegister.js";

import { codeValue } from "../../store/CodeValue.js";
const code = codeValue();

const steps = reactive({
  one: true,
  two: false,
  three: false,
});

onUnmounted(()=>{
  code.code = "";
code.codeString = "";
name.name = undefined;
password.password = undefined;
email.email = undefined;
messageRequire.messageRequire.appear = false;
messageRequire.messageRequire.message = undefined;
steps.three = false;
steps.two = false;
})


const confirm = computed(() => {
  if (steps.one && steps.two && steps.three) return "Confirm";
  else return "Next";
});

const cancel = computed(() => {
  if (steps.one && !steps.two && !steps.three) return "Cancel";
  else return "Back";
});

async function next() {
  if (steps.one && !steps.two && !steps.three) {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.email)) {
      messageRequire.messageRequire.appear = false;
      messageRequire.messageRequire.message = undefined;
      const checked = await codeExistenceCheck();
      if (checked) {
        steps.two = true;
        messageRequire.messageRequire.appear = false;
        messageRequire.messageRequire.message = undefined;
      }
      return;
    } else {
      messageRequire.messageRequire.message = "*Invalid email.";
      messageRequire.messageRequire.appear = true;
      return;
    }
  }
  if (steps.one && steps.two && !steps.three) {
    messageRequire.messageRequire.appear = false;
    messageRequire.messageRequire.message = undefined;
    const verified = await emailVerification();
    if (verified) {
      steps.three = true;
      messageRequire.messageRequire.appear = false;
      messageRequire.messageRequire.message = undefined;
    }
    return;
  }
  if (steps.one && steps.two && steps.three) {
    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!regex.test(password.password)) {
      if (!/[A-Z]/.test(password.password)) {
        messageRequire.messageRequire.message =
          "*At least one uppercase letter.";
        messageRequire.messageRequire.appear = true;

        return;
      }
      if (!/[a-z]/.test(password.password)) {
        messageRequire.messageRequire.message =
          "*At least one lowercase letter.";
        messageRequire.messageRequire.appear = true;

        return;
      }
      if (!/\d/.test(password.password)) {
        messageRequire.messageRequire.message = "*At least one number.";
        messageRequire.messageRequire.appear = true;

        return;
      }
      if (!/[@$!%*?&]/.test(password.password)) {
        messageRequire.messageRequire.message =
          "*At least one special character.";
        messageRequire.messageRequire.appear = true;

        return;
      }
      if (password.password.length < 8) {
        messageRequire.messageRequire.message = "*At least 8 characters.";
        messageRequire.messageRequire.appear = true;

        return;
      }
    }
    const registered = await userRegister();
    if (registered) {
      router.push("/login");
    }
  }
}

function back() {
  if (steps.three) {
    steps.two = false;
    steps.three = false;
    messageRequire.messageRequire.appear = false;
    messageRequire.messageRequire.message = undefined;
    return;
  }
  if (steps.two) {
    steps.two = false;
    messageRequire.messageRequire.appear = false;
    messageRequire.messageRequire.message = undefined;
    return;
  }

  router.push("/");
}
</script>
