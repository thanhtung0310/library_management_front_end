<template>
  <nav>
   <TheHeader />
  </nav>
  <router-view/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TheHeader from '@/components/TheHeader.vue';

@Options({
  components: {
    TheHeader,
  },
})
export default class HomeView extends Vue {}
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
