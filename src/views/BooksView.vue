<template>
  <div class="books">
    <h1>This is page to show all book available</h1>
    <BookList />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BookList from '@/Pages/Books/BookList.vue'; // @ is an alias to /src

@Options({
  name: 'BookView',
  components: {
    BookList,
  },
})
export default class HomeView extends Vue {}
</script>
