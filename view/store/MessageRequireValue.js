import { defineStore } from "pinia";
import { reactive } from "vue";

export const messageRequireValue = defineStore('messageRequire',()=>{
    const messageRequire = reactive({
        appear: false,
        message: undefined,
      });

      return{
        messageRequire
      }
})