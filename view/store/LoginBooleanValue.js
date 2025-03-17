import { defineStore } from "pinia";
import { ref } from "vue";

export const isLoggedValue = defineStore("isLogged", () => {
  const isLogged = ref(false);
  return {
    isLogged,
  };
});
