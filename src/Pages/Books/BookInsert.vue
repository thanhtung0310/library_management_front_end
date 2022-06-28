<template>
  <div v-if="show" class="insert-box">
    <div class="box-header">
      <p>Create new book</p>
    </div>
    <div class="form">
      <div class="form-group databox">
        <label>Book title: </label>
        <input
          v-model="input.book_Title"
          type="text"
          name="book_title"
          id="book_title"
          placeholder="Please enter book title..."
        />
      </div>
      <div class="form-group databox">
        <label>Publisher ID: </label>
        <select
          v-model="input.book_PublisherID"
          name="publisher_id"
          id="publisher_id"
        >
          <option value="">Select publisher</option>
          <option value="1">Alfred A. Knopf</option>
          <option value="2">Justin Bieber</option>
          <option value="3">The Rock</option>
          <option value="4">J. K. Rowling</option>
        </select>
      </div>
      <div class="form-group button">
        <input
          type="button"
          name="btnCreate"
          id="btnCreate"
          value="CREATE"
          @click="$emit('close'), createBook()"
        />
      </div>
      <div class="publisher-create">
        <router-link to="/publisher_insert"
          >Click here to create new publisher</router-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "book_insert",
  data() {
    return {
      baseURL: "https://localhost:7123/api/books/",
      data: null,
      book_title: null,
      publisher_id: null,
      publisher_title: null,
      input: { book_Title: null, book_PublisherID: null },
    };
  },
  props: {
    show: Boolean,
  },
  methods: {
    createBook(): void {
      axios
        .post(this.baseURL, this.input)
        .then((response) => {
          this.data = response.data;
          alert("Book is created successfully!");
          this.clearData();
        })
        .catch((error) => {
          console.log(error);
          this.clearData();
        });
    },
    clearData(): void {
      this.input.book_Title = null;
      this.input.book_PublisherID = null;
    },
  },
});
</script>


<style src="@/assets/css/insert-style.css" scoped></style>