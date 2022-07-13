<template>
  <div class="update-box">
    <div class="box-header">
      <p>
        {{ $t("message.update_message", { table: "author" }) }} {{ bookID }}
      </p>
    </div>
    <div class="form">
      <div class="form-group databox">
        <label>{{ $t("books.book_title") }}: </label>
        <input
          :value="bookTitle"
          type="text"
          name="book_title"
          id="book_title"
          placeholder="Please update book title..."
        />
      </div>
      <div class="form-group databox">
        <label>{{ $t("books.publisher_id") }}: </label>
        <input
          :value="publisherID"
          type="text"
          name="publisher_id"
          id="publisher_id"
          placeholder="Please update publisher ID..."
        />
      </div>
      <div class="form-group button">
        <button type="submit" @click="$emit('close'), updateData()">
          {{ $t("message.update_header") }}
        </button>
      </div>
    </div>
  </div>
</template>>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "book_update",
  data() {
    return {
      baseURL: "https://localhost:7123/api/books/",
      input: {
        bookID: this.bookID,
        bookTitle: this.bookTitle,
        book_PublisherID: this.publisherID,
      },
    };
  },
  props: {
    bookID: {
      type: Number,
      default: 0,
    },
    bookTitle: {
      type: String,
      default: "",
    },
    publisherID: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    // update new data into database
    updateData(): void {
      // parsing data from parent comp to child comp
      this.input.bookID = this.bookID;
      this.input.bookTitle = this.bookTitle;
      this.input.book_PublisherID = this.publisherID;

      // parsing data into Json format
      const body = JSON.stringify(this.input);
      const headers = {
        "Content-Type": "application/json",
      };

      // call axios put callback
      axios
        .put(this.baseURL + this.bookID, body, { headers })
        .then(() => {
          alert("Success update book with id = " + this.bookID);
        })
        .catch((error) => {
          alert("Cannot connect to server...");
          console.log(error);
        });
    },
  },
  computed: {
    msg() {
      return this.$t("books.btnUpdate");
    },
  },
});
</script>

<style src="@/assets/css/update-style.css" scoped></style>