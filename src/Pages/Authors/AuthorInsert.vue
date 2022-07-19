<template>
  <div v-if="show" class="insert-box">
    <div class="box-header">
      <p>{{ $t("message.create_message", { table: "author" }) }}</p>
    </div>
    <div class="form">
      <div class="form-group databox">
        <label>{{ $t("authors.book_id") }}: </label>
        <input
          v-model="input.author_BookID"
          type="text"
          name="book_id"
          id="book_id"
          placeholder="Please enter book ID..."
        />
      </div>
      <div class="form-group databox">
        <label>{{ $t("authors.author_name") }}: </label>
        <input
          v-model="input.authorName"
          type="text"
          name="author_name"
          id="author_name"
          placeholder="Please enter author name..."
        />
      </div>
      <div class="form-group button">
        <button type="submit" @click="$emit('close'), createData()">
          {{ $t("message.create_header") }}
        </button>
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
      // baseURL: "https://localhost:7123/api/authors/",
      new_data: null,
      input: {
        author_BookID: null,
        authorName: null,
      },
    };
  },
  props: {
    show: Boolean,
    baseURL: {
      type: String, 
      default: "",
    }
  },
  methods: {
    // create new author in database
    createData(): void {
      // call axios post callback
      axios
        .post(this.baseURL, this.input)
        .then(() => {
          alert("New author is created successfully!");
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
      this.input.author_BookID = null;
      this.input.authorName = null;
    },
  },
});
</script>


<style src="@/assets/css/insert-style.css"></style>