<!-- eslint-disable vue/no-mutating-props -->
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
        <el-input v-model="bookTitle_value" type="text" id="book_title" />
      </el-form-item>

      <el-form-item>
        <label>{{ $t("books.publisher_id") }}: </label>
        <el-select v-model="publisherID_value" style="width: 100%">
          <el-option
            v-for="item in publisher_list"
            :key="item.publisherID"
            :label="item.publisherName"
            :value="item.publisherID"
          >
            <span style="float: left">{{ item.publisherName }}</span>
            <span
              style="
                float: right;
                color: var(--el-text-color-secondary);
                font-size: 13px;
              "
              >{{ item.publisherID }}</span
            >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item class="button-group">
        <el-button type="success" @click="updateData()" round>
          {{ $t("message.update_header") }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import { ElMessageBox } from "element-plus";
import type { Action } from "element-plus";
import { serverNotification, requestMessage } from "@/axios-functions";

export default defineComponent({
  name: "book_update",
  data() {
    return {
      input: {
        bookID: ref(0),
        bookTitle: ref(""),
        book_PublisherID: ref(0),
      },
      publisher_baseURL: "https://localhost:7123/api/publishers/",
      publisher_list: null,
      bookTitle_value: ref(""),
      publisherID_value: ref(0),
    };
  },
  props: {
    bookID: {
      default: ref(0),
      type: Number,
    },
    bookTitle: {
      default: ref(""),
      type: String,
    },
    publisherID: {
      default: ref(0),
      type: Number,
    },
    baseURL: {
      default: ref(""),
      type: String,
    },
    runMethod: Boolean,
  },
  methods: {
    getDataFromParentComp(): void {
      this.bookTitle_value = this.bookTitle;
      this.publisherID_value = this.publisherID;
      console.log(this.bookTitle_value, this.publisherID_value);
    },
    // get publisher list
    getDataFromApi(): void {
      // call axios get callback
      axios
        .get(this.publisher_baseURL)
        .then((response) => {
          if (response.data != null) {
            this.publisher_list = response.data;
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
    // update new data into database
    updateData(): void {
      // parsing data from parent comp to child comp
      this.input.bookID = this.bookID;
      this.input.bookTitle = this.bookTitle_value;
      this.input.book_PublisherID = this.publisherID_value;

      // parsing data into Json format
      const body = JSON.stringify(this.input);
      const headers = {
        "Content-Type": "application/json",
      };

      // open update confirmation modal
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
              requestMessage("success", "Update", "confirm");
              this.$emit("refresh");
              this.$emit("close");
              console.log(body);
            })
            .catch((error) => {
              // open error notification
              requestMessage("error", "Update", "confirm");
              console.log(error);
            });
        })
        .catch((action: Action) => {
          requestMessage("info", "Update", action);
        });
    },
  },
  watch: {
    runMethod(): void {
      this.getDataFromParentComp();
    },
  },
  mounted() {
    this.getDataFromApi();
  },
  // computed: {
  //   msg() {
  //     return this.$t("books.btnUpdate");
  //   },
  // },
});
</script>

<style src="@/assets/css/update-style.css"></style>
