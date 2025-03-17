import { defineStore } from "pinia";
import { ref } from "vue";

export const nameValue = defineStore("nameValue", () => {
  const name = ref(undefined);

  return {
    name,
  };
});
