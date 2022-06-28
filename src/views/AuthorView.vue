<template>
  <div class="authors">
    <h1>AUTHOR LIST</h1>

    <table class="table">
      <thead>
        <tr>
          <th>Author ID</th>
          <th>Book ID</th>
          <th>Author name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in data" :key="index">
          <td v-text="row.book_authors_AuthorID"></td>
          <td v-text="row.book_authors_BookID"></td>
          <td v-text="row.book_authors_AuthorName"></td>
          <td>
            <font-awesome-icon class="icon" icon="fa-solid fa-circle-info" />
          </td>
          <td>
            <font-awesome-icon class="icon" icon="fa-solid fa-ban" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "AuthorView",
  components: {},
  data() {
    return {
      data: null,
      URL: "https://localhost:7123/api/authors/",
      showModal: false,
    };
  },
  methods: {
    getData(): void {
      axios
        .get(this.URL)
        .then((response) => (this.data = response.data))
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.getData();
  },
});
</script>

<style src="@/assets/css/table-style.css"></style>