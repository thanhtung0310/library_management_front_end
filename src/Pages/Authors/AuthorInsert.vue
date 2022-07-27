<template>
  <div class="insert-box">
    <el-form :modal="input">
      <div class="box-header">
        <p>{{ $t("message.create_message", { table: "author" }) }}</p>
      </div>

      <el-form-item>
        <label>{{ $t("authors.book_id") }}: </label>
        <el-select
          v-model="book_id"
          placeholder="Select book"
          style="width: 100%"
        >
          <el-option
            v-for="item in book_list"
            :key="item.bookID"
            :label="item.bookTitle"
            :value="item.bookID"
          >
            <span style="float: left">{{ item.bookTitle }}</span>
            <span
              style="
                float: right;
                color: var(--el-text-color-secondary);
                font-size: 13px;
              "
              >{{ item.bookID }}</span
            >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <label>{{ $t("authors.author_name") }}: </label>
        <el-input
          v-model="input.authorName"
          type="text"
          placeholder="Please enter author name..."
        />
      </el-form-item>

      <el-form-item class="button-group">
        <el-button type="success" @click="createData()" round>
          {{ $t("message.create_header") }}
        </el-button>
        <el-button type="info" @click="clearData()" round>{{
          $t("message.reset_message")
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import { requestMessage, serverNotification } from "@/axios-functions";

export default defineComponent({
  name: "author_insert",
  data() {
    return {
      book_baseURL: "https://localhost:7123/api/books/",
      book_list: null,
      book_id: ref(""),
      input: {
        author_BookID: "",
        authorName: "",
      },
    };
  },
  props: {
    baseURL: {
      type: String,
      default: "",
    },
  },
  methods: {
    // get publisher list
    getDataFromApi(): void {
      // call axios get callback
      axios
        .get(this.book_baseURL)
        .then((response) => {
          if (response.data != null) {
            this.book_list = response.data;
          } else {
            // open warning notification
            serverNotification("warning");
          }
        })
        .catch((error) => {
          // open error notification
          serverNotification("error");
          console.log(error);
        });
    },
    // create new author in database
    createData(): void {
      //
      this.input.author_BookID = this.book_id;
      // call axios post callback
      axios
        .post(this.baseURL, this.input)
        .then(() => {
          // open success notification
          requestMessage("success", "Insert", "confirm");
          this.clearData();
          this.$emit("refresh");
          this.$emit("close");
        })
        .catch((error) => {
          // open error notification
          requestMessage("error", "Insert", "confirm");
          console.log(error);
        });
    },
    // clear input data
    clearData(): void {
      this.input = {
        author_BookID: "",
        authorName: "",
      };
    },
  },
  created() {
    this.getDataFromApi();
  },
});
</script>

<style src="@/assets/css/insert-style.css"></style>
