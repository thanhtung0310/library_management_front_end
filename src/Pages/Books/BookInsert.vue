<template>
  <div v-if="show" class="insert-box">
    <div class="box-header">
      <p>{{ $t("message.create_message", { table: "book" }) }}</p>
    </div>
    <div class="form">
      <div class="form-group databox">
        <label>{{ $t("books.book_title") }}: </label>
        <input
          v-model="input.bookTitle"
          type="text"
          name="bookTitle"
          id="bookTitle"
          placeholder="Please enter book title..."
        />
      </div>
      <!-- get publisher list and parse into publisher id -->
      <div class="form-group databox">
        <label>{{ $t("books.publisher_id") }}: </label>
        <select
          v-model="input.book_PublisherID"
          name="publisher_id"
          id="publisher_id"
        >
          <option default>{{ $t("books.publisher_list") }}</option>
          <option value="1">Alfred A. Knopf</option>
          <option value="2">Justin Bieber</option>
          <option value="3">The Rock</option>
          <option value="4">J. K. Rowling</option>
        </select>
      </div>
      <div class="form-group button">
        <button type="submit" @click="$emit('close'), createData()">
          {{ $t("message.create_header") }}
        </button>
      </div>
      <div class="publisher-create">
        <router-link to="/publishers/insert">{{
          $t("message.create_message", { table: "publisher" })
        }}</router-link>
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
      input: {
        bookTitle: null,
        book_PublisherID: null,
      },
    };
  },
  props: {
    show: Boolean,
  },
  methods: {
    // create new book in database
    createData(): void {
      // call axios post callback
      axios
        .post(this.baseURL, this.input)
        .then(() => {
          alert("New book is created successfully!");
          this.clearData();
        })
        .catch((error) => {
          alert("Cannot connect to server...");
          this.clearData();
          console.log(error);
        });
    },
    // clear input data
    clearData(): void {
      this.input.bookTitle = null;
      this.input.book_PublisherID = null;
    },
  },
});
</script>


<style src="@/assets/css/insert-style.css" scoped></style>