<template>
  <div class="insert-box">
    <el-form :model="input" :rules="rules">
      <div class="box-header">
        <p>{{ $t("message.create_message", { table: "book" }) }}</p>
      </div>

      <el-form-item prop="title">
        <label>{{ $t("books.book_title") }}: </label>
        <el-input
          v-model="input.bookTitle"
          placeholder="Please enter book title..."
        />
      </el-form-item>

      <el-form-item prop="ID">
        <label>{{ $t("books.publisher_id") }}: </label>
        <el-input
          v-model="input.book_PublisherID"
          placeholder="Please enter publisher ID..."
        />
        <!-- <el-select v-model="input.book_PublisherID">
          <el-option default>{{ $t("books.publisher_list") }}</el-option>
          <el-option value="1">Alfred A. Knopf</el-option>
          <el-option value="2">Justin Bieber</el-option>
          <el-option value="3">The Rock</el-option>
          <el-option value="4">J. K. Rowling</el-option>
        </el-select> -->
      </el-form-item>

      <el-form-item class="button-group">
        <el-button type="success" @click="$emit('close'), createData()" round>
          {{ $t("message.create_header") }}</el-button
        >
        <el-button type="info" @click="clearData()" round
          >Reset input</el-button
        >
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
import { defineComponent, reactive } from "vue";
import axios from "axios";
import { ElMessage, FormInstance, FormRules } from "element-plus";

export default defineComponent({
  name: "book_insert",
  data() {
    return {
      // baseURL: "https://localhost:7123/api/books/",
      input: {
        bookTitle: null,
        book_PublisherID: null,
      },
      rules: reactive<FormRules>({
        title: [
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
      }),
    };
  },
  props: {
    show: Boolean,
    baseURL: {
      type: String,
      default: "",
    },
  },
  methods: {
    // create new book in database
    createData(): void {
      // call axios post callback
      axios
        .post(this.baseURL, this.input)
        .then(() => {
          // open success notification
          ElMessage({
            type: "success",
            message: "Insert process completed!",
          });
          this.clearData();
          this.$emit("refresh");
        })
        .catch((error) => {
          // open error notification
          ElMessage({
            type: "error",
            message: "Insert process failed! Please try again.",
          });
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
      this.input.bookTitle = null;
      this.input.book_PublisherID = null;
    },
  },
});
</script>

<style src="@/assets/css/insert-style.css"></style>
