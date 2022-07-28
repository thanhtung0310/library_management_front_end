<template>
  <div class="insert-box">
    <el-form ref="ruleFormRef" :rules="rules">
      <div class="box-header">
        <p>{{ $t("message.create_message", { table: "book" }) }}</p>
      </div>

      <el-form-item prop="title">
        <label>{{ $t("books.book_title") }}: </label>
        <el-input
          v-model="ruleForm.title"
          type="text"
          placeholder="Please enter book title..."
        />
      </el-form-item>

      <el-form-item prop="id">
        <label>{{ $t("books.publisher_id") }}: </label>
        <el-select
          v-model="ruleForm.id"
          placeholder="Select publisher"
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
import type { FormInstance, FormRules } from "element-plus";
import { requestMessage, serverNotification } from "@/axios-functions";

export default defineComponent({
  name: "book_insert",
  data() {
    return {
      ruleFormRef: ref<FormInstance>(),
      publisher_baseURL: "https://localhost:7123/api/publishers/",
      publisher_list: null,
      input: {
        bookTitle: ref(""),
        book_PublisherID: ref(""),
      },
      ruleForm: reactive({
        title: "",
        id: "",
      }),
      rules: reactive<FormRules>({
        title: [
          {
            required: true,
            message: "Please input book title",
            trigger: "blur",
          },
          {
            min: 3,
            max: 100,
            message: "Length should between 3 and 100",
            trigger: "blur",
          },
        ],
        id: [
          {
            required: true,
            message: "Please select publisher",
            trigger: "change",
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
          if (!response) {
            // open warning notification
            serverNotification("warning");
            return;
          }
          this.publisher_list = response.data;
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
      this.input.bookTitle = this.ruleForm.title;
      this.input.book_PublisherID = this.ruleForm.id;
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
        bookTitle: "",
        book_PublisherID: "",
      };
    },
    // submit form
    submitForm(formEl: FormInstance | undefined) {
      console.log(formEl);
      if (!formEl) return;
      formEl.validate((valid, fields) => {
        if (!valid) {
          // open error notification
          requestMessage("error", "Insert", "confirm");
          console.log("error submit!", fields);
          return;
        }
        this.createData();
      });
    },
  },
  created() {
    this.getDataFromApi();
  },
});
</script>

<style src="@/assets/css/insert-style.css"></style>
