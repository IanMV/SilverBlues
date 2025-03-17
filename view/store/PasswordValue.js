import { defineStore } from "pinia";
import { ref } from "vue";

export const passwordValue = defineStore("password", () => {
  const password = ref(undefined);

  return {
    password,
  };
});
