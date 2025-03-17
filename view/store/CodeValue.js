import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const codeValue = defineStore("codeValue", () => {
  const code = ref("");
  const codeString = computed(() => {
    return code.value.toString();
  });

  return {
    code,
    codeString,
  };
});
