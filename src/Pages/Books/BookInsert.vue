<template>
  <div class="insert-box">
    <el-form :model="input" :rules="rules">
      <div class="box-header">
        <p>{{ $t("message.create_message", { table: "book" }) }}</p>
      </div>

      <el-form-item prop="name">
        <label>{{ $t("books.book_title") }}: </label>
        <el-input
          v-model="input.bookTitle"
          type="text"
          placeholder="Please enter book title..."
        />
      </el-form-item>

      <!-- el-select el-option data=publisher_list  -->
      <el-form-item prop="id">
        <label>{{ $t("books.publisher_id") }}: </label>
        <el-select
          v-model="publisher_id"
          placeholder="Select book's publisher"
          style="width: 100%"
        >
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
        <el-button type="success" @click="createData()" round>
          {{ $t("message.create_header") }}</el-button
        >
        <el-button type="info" @click="clearData()" round>{{
          $t("message.reset_message")
        }}</el-button>
      </el-form-item>

      <el-form-item class="link">
        <div class="publisher-create">
          <router-link to="/publishers/insert">{{
            $t("message.create_message", { table: "publisher" })
          }}</router-link>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import axios from "axios";
import { FormInstance, FormRules } from "element-plus";
import { requestMessage, serverNotification } from "@/axios-functions";

export default defineComponent({
  name: "book_insert",
  data() {
    return {
      publisher_baseURL: "https://localhost:7123/api/publishers/",
      publisher_list: null,
      publisher_id: ref(""),
      input: {
        bookTitle: "",
        book_PublisherID: "",
      },
      rules: reactive<FormRules>({
        name: [
          {
            required: true,
            message: "Please input book title",
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: "Length should be 3 to 5",
            trigger: "blur",
          },
        ],
        ID: [
          {
            required: true,
            message: "Please choose publisher",
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: "Length should be 3 to 5",
            trigger: "blur",
          },
        ],
      }),
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
    // create new book in database
    createData(): void {
      //
      this.input.book_PublisherID = this.publisher_id;
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
    // submit form
    submitForm(formEl: FormInstance | undefined) {
      if (!formEl) return;
      formEl.validate((valid, fields) => {
        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!", fields);
        }
      });
    },
    // reset form input
    resetForm(formEl: FormInstance | undefined) {
      if (!formEl) return;
      formEl.resetFields();
    },
    // clear input data
    clearData(): void {
      this.input = {
        bookTitle: "",
        book_PublisherID: "",
      };
      this.publisher_id = "";
    },
  },
  created() {
    this.getDataFromApi();
  },
});
</script>

<style src="@/assets/css/insert-style.css"></style>
