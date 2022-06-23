<template>
  <div class="books">
    <h1>This is page to show all authors by book</h1>
    <AuthorList />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AuthorList from "@/Pages/Authors/AuthorList.vue"; // @ is an alias to /src

@Options({
  name: "AuthorView",
  components: {
    AuthorList,
  },
})
export default class HomeView extends Vue {}
</script>
