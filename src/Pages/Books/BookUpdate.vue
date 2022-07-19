<template>
  <div class="update-box">
    <el-form>
      <div class="box-header">
        <p>
          {{ $t("message.update_message", { table: "book" }) }} {{ bookID }}
        </p>
      </div>
      <el-form-item>
        <label>{{ $t("books.book_title") }}: </label>
        <el-input :value="bookTitle" v-model="input.bookTitle" />
      </el-form-item>
      <el-form-item>
        <label>{{ $t("books.publisher_id") }}: </label>
        <el-input :value="publisherID" v-model="input.book_PublisherID" />
      </el-form-item>
      <el-form-item class="button-group">
        <el-button type="success" @click="$emit('close'), updateData()" round>
          {{ $t("message.update_header") }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
import type { Action } from "element-plus";

export default defineComponent({
  name: "book_update",
  data() {
    return {
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
    baseURL: {
      type: String,
      default: "",
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

      // open delete confirmation modal
      ElMessageBox.confirm("This ID will be updated. Continue?", "Info", {
        distinguishCancelAndClose: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        draggable: true,
      })
        .then(() => {
          // call axios put callback
          axios
            .put(this.baseURL + this.bookID, body, { headers })
            .then(() => {
              // open success notification
              ElMessage({
                type: "success",
                message: "Completely update ID " + this.bookID + "!",
              });
              this.$emit("refresh");
            })
            .catch((error) => {
              // open error notification
              ElMessage({
                type: "error",
                message: "Update process failed! Please try again.",
              });
              console.log(error);
            });
        })
        .catch((action: Action) => {
          ElMessage({
            type: "info",
            message:
              action === "cancel"
                ? "Update process cancelled!"
                : "Nothing happen :3",
          });
        });
    },
  },
  // computed: {
  //   msg() {
  //     return this.$t("books.btnUpdate");
  //   },
  // },
});
</script>

<style src="@/assets/css/update-style.css"></style>
