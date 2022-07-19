<template>
  <div class="update-box">
    <div class="box-header">
      <p>
        {{ $t("message.update_message", { table: "author" }) }} {{ authorID }}
      </p>
    </div>
    <div class="form">
      <div class="form-group databox">
        <label>{{ $t("authors.book_id") }}: </label>
        <input
          :value="bookID"
          type="text"
          name="book_id"
          id="book_id"
          placeholder="Please update book id..."
        />
      </div>
      <div class="form-group databox">
        <label>{{ $t("authors.author_name") }}: </label>
        <input
          :value="authorName"
          type="text"
          name="author_name"
          id="author_name"
          placeholder="Please update author name..."
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
  name: "author_update",
  data() {
    return {
      // baseURL: "https://localhost:7123/api/authors/",
      input: {
        authorID: this.authorID,
        author_BookID: this.bookID,
        authorName: this.authorName,
      },
    };
  },
  props: {
    authorID: {
      default: 0,
      type: Number,
    },
    bookID: {
      default: 0,
      type: Number,
    },
    authorName: {
      default: "",
      type: String,
    },
    baseURL: {
      type: String, 
      default: "",
    }
  },
  methods: {
    // update new data into database
    updateData(): void {
      // parsing data from parent comp to child comp
      this.input.authorID = this.authorID;
      this.input.author_BookID = this.bookID;
      this.input.authorName = this.authorName;

      // parsing data into Json format
      const body = JSON.stringify(this.input);
      const headers = {
        "Content-Type": "application/json",
      };

      // gọi API update
      axios
        .put(this.baseURL + this.authorID, body, { headers })
        .then(() => {
          alert("Success update author with id = " + this.authorID);
        })
        .catch((error) => {
          alert("Cannot connect to server...");
          console.log(error);
        });
    },
  },
});
</script>

<style src="@/assets/css/update-style.css"></style>