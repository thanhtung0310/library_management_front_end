<template>
  <div class="home">
    <HelloWorld msg="Welcome to my project"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/views/HelloWorld.vue'; // @ is an alias to /src

@Options({
  name: 'HomeView',
  components: {
    HelloWorld,
  },
})
export default class HomeView extends Vue {}
</script>
