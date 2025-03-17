<template>
  <MyHeader
    ><template v-slot:summary><LeftSummary /><RightSummary /></template
  ></MyHeader>
  <main>
    <HomeSection />
    <MoreaccessSection />
    <OffersSection />
    <NewcollectionSection />
  </main>
</template>
<script setup>
import MyHeader from "../../../view/components/header/MyHeader.vue";
import LeftSummary from "../../components/header/header-components/LeftSummary.vue";
import RightSummary from "../../components/header/header-components/RightSummary.vue";
import MoreaccessSection from "./HomeComponents/MoreacessSection.vue";
import OffersSection from "./HomeComponents/OffersSection.vue";
import NewcollectionSection from "./HomeComponents/NewcollectionSection.vue";
import HomeSection from "./HomeComponents/HomeSection.vue";
</script>
