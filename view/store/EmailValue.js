import { defineStore } from "pinia";
import { ref } from "vue";

export const emailValue = defineStore("email", () => {
  const email = ref(undefined);

  return {
    email,
  };
});
