<template>
  <div class="update-box">
    <div class="box-header">
      <p>Update author with id {{ authorID }}</p>
    </div>
    <div class="form">
      <div class="form-group databox">
        <label>Book ID: </label>
        <input
          :value="bookID"
          type="text"
          name="book_id"
          id="book_id"
          placeholder="Please update book id..."
        />
      </div>
      <div class="form-group databox">
        <label>Author name: </label>
        <input
          :value="authorName"
          type="text"
          name="author_name"
          id="author_name"
          placeholder="Please update author name..."
        />
      </div>
      <div class="form-group button">
        <input
          type="button"
          name="btnUpdate"
          id="btnUpdate"
          value="UPDATE"
          @click="$emit('close'), updateData()"
        />
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
      baseURL: "https://localhost:7123/api/authors/",
      input: {
        book_authors_BookID: this.bookID,
        book_authors_AuthorName: this.authorName,
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
  },
  methods: {
    updateData(): void {
      // parse dữ liệu sang dạng JSON
      const modelParse = JSON.parse(JSON.stringify(this.input));

      // gọi API update
      axios
        .put(this.baseURL + this.authorID, modelParse)
        .then(() => {
          alert("Success update author with id = " + this.authorID);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>

<style src="@/assets/css/update-style.css" scoped></style>