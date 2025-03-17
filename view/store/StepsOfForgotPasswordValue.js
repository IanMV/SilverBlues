import { defineStore } from "pinia";
import { reactive } from "vue";

export const stepsForgotValue = defineStore("steps", () => {
  const steps = reactive({
    one: true,
    two: false,
    three: false,
  });

  return steps;
});
