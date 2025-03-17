<template>
  <p>
    <input  type="number" v-model="code.code" />

  </p>
</template>

<script setup>
import { codeValue } from "../../../store/CodeValue.js";
const code = codeValue();
</script>
