<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>Book ID</th>
          <th>Book title</th>
          <th>Book's publisher</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, index) in data" :key="index">
          <td v-text="book.book_BookID"></td>
          <td v-text="book.book_Title"></td>
          <td v-text="book.book_PublisherID"></td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- <div class="info">
    {{ data }}
  </div> -->
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import axios from "axios";

@Options({
  name: "BookList",
  data() {
    return {
      data: null,
    };
  },
  mounted() {
    this.getData();
  },
})
export default class BookList extends Vue {
  URL = "https://localhost:7123/api/books";
  getData(): void {
    axios
      .get(this.URL)
      .then((response) => (this.data = response.data))
      .catch((error) => console.log(error));
  }
}
</script>

<style>
.table {
  text-align: center;
  border: double;
  background-color: white;
  width: 80%;
  margin-left: 10%;
  align-self: center;
}
</style>
