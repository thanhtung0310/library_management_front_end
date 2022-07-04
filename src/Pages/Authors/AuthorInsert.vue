<template>
  <div v-if="show" class="insert-box">
    <div class="box-header">
      <p>Create new author</p>
    </div>
    <div class="form">
      <div class="form-group databox">
        <label>Book ID: </label>
        <input
          v-model="input.book_authors_BookID"
          type="text"
          name="book_id"
          id="book_id"
          placeholder="Please enter book ID..."
        />
      </div>
      <div class="form-group databox">
        <label>Author name: </label>
        <input
          v-model="input.book_authors_AuthorName"
          type="text"
          name="author_name"
          id="author_name"
          placeholder="Please enter author name..."
        />
      </div>
      <div class="form-group button">
        <input
          type="button"
          name="btnCreate"
          id="btnCreate"
          value="CREATE"
          @click="$emit('close'), createAuthor()"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "author_insert",
  data() {
    return {
      baseURL: "https://localhost:7123/api/authors/",
      data: null,
      input: {
        book_authors_BookID: null,
        book_authors_AuthorName: null,
      },
    };
  },
  props: {
    show: Boolean,
  },
  methods: {
    createAuthor(): void {
      axios
        .post(this.baseURL, this.input)
        .then((response) => {
          this.data = response.data;
          alert("Author is created successfully!");
          this.clearData();
        })
        .catch((error) => {
          console.log(error);
          this.clearData();
        });
    },
    clearData(): void {
      this.input.book_authors_BookID = null;
      this.input.book_authors_AuthorName = null;
    },
  },
});
</script>


<style src="@/assets/css/insert-style.css" scoped></style>