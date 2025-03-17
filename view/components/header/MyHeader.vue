<template>
  <header>
    <nav>
      <ul id="navTop">
        <li><router-link to="/">*Logo*</router-link></li>
        <li><router-link to="/">Feedback</router-link></li>
        <li><router-link to="/">Tracking</router-link></li>
        <li v-if="isLogged.isLogged">
          <router-link to="/">*Silhouette*</router-link
          ><router-link to="/">Shop Cart</router-link>
        </li>
        <li><router-link to="/login">login</router-link></li>
      </ul>
      <ul id="navUnder">
        <li><input type="text" /></li>
        <li id="categories">
          <ul>
            <li><router-link to="/">Kid's</router-link></li>
            <li><router-link to="/">Woman's</router-link></li>
            <li><router-link to="/">Men's</router-link></li>
          </ul>
        </li>
      </ul>
      <ul><li>{{ userInformation.name }}</li><li>{{ userInformation.email }}</li></ul>
    </nav>
    <slot name="summary"></slot>
  </header>
</template>

<script setup>
import { isLoggedValue } from "../../store/LoginBooleanValue.js";
const isLogged = isLoggedValue();

import { userInformationValue } from "../../store/UserInformationValue.js";
const userInformation = userInformationValue()
</script>

<style scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 5vh;
  width: 100%;
  nav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5vh;

    width: 75%;
    #navTop {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    #navUnder {
      display: flex;
      justify-content: space-between;
      align-items: center;
      #categories {
        width: 30%;
        justify-content: center;
        display: flex;
        align-items: center;
        ul {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }
}
</style>
