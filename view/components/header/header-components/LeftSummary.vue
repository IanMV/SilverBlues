<template>
  <nav id="leftNav">
    <ul>
      <li><router-link to="">Home</router-link></li>
      <li><router-link to="">More access</router-link></li>
      <li><router-link to="">Offers</router-link></li>
      <li><router-link to="">New collection </router-link></li>
      <li><router-link to="">Buddy shops</router-link></li>
    </ul>
  </nav>
</template>

<style scoped>
#leftNav {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  ul {
    display: flex;
    flex-direction: column;
    gap: 3vh;
  }
}
</style>
