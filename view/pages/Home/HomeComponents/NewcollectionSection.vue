<template>
  <section>
    <h1>New collection</h1>
    <h2>Summer</h2>
    <ul v-if="!messageRequire.messageRequire.appear">
      <li v-for="product in products" :key="product.id">
        <p>Name: {{ product.name }}</p>
        <p>Price: {{ product.price }}</p>
        <p v-if="product.offer">Offer: {{ product.offer }}</p>
        <p v-if="product.collection">Collection: {{ product.collection }}</p>
      </li>
    </ul>
    <div v-else>{{ messageRequire.messageRequire.message }}</div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getProducts } from "../../../../model/products/getProducts";
import { messageRequireValue } from "../../../store/MessageRequireValue";
import { productsFilter } from "../../../../model/products/productsFilter.js";

const messageRequire = messageRequireValue();
const products = ref([]);
const offers = ref([]);

onMounted(async () => {
  products.value = await getProducts();
  products.value = productsFilter(
    null,
    "Summer",
    ["collection"],
    products.value
  ).slice(0,4);
});
</script>

<style scoped>
section {
  justify-self: center;
  width: 75%;
}
</style>
