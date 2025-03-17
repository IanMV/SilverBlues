import { defineStore } from "pinia";
import { reactive } from "vue";

export const userInformationValue = defineStore("userInformation", () => {
  const userInformation = reactive({
    name: undefined,
    email: undefined
  });

  return userInformation;
});
