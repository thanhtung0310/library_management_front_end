<template>
  <TheHeader />
  <div id="app">
    <router-view />
  </div>
  <TheFooter />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";

export default defineComponent({
  name: "App",
  components: {
    TheHeader,
    TheFooter
  },
});
</script>

<style>
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  background-color: #5d4954;
  color: white;
  overflow-x: hidden;
}
</style>
