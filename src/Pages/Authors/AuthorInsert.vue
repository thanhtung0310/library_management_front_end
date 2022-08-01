<template>
  <div class="insert-box">
    <el-form ref="ruleFormRef" :rules="rules">
      <div class="box-header">
        <p>{{ $t("message.create_message", { table: "author" }) }}</p>
      </div>

      <el-form-item prop="id">
        <template #label>{{ $t("authors.book_id") }}: </template>
        <el-select
          v-model="ruleForm.id"
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

      <el-form-item prop="name">
        <template #label>{{ $t("authors.author_name") }}: </template>
        <el-input
          v-model="ruleForm.name"
          type="text"
          placeholder="Please enter author name..."
        />
      </el-form-item>

      <el-form-item class="button-group">
        <el-button type="success" @click="createData(ruleFormRef)" round>
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
import { defineComponent, reactive, ref } from "vue";
import axios from "axios";
import type { FormInstance, FormRules } from "element-plus";
import { requestMessage, serverNotification } from "@/axios-functions";

export default defineComponent({
  name: "author_insert",
  data() {
    return {
      ruleFormRef: ref<FormInstance>(),
      book_baseURL: "https://localhost:7123/api/books/",
      book_list: [],
      input: {
        author_BookID: ref(0),
        authorName: ref(""),
      },
      ruleForm: reactive({
        id: 0,
        name: "",
      }),
      rules: reactive<FormRules>({
        id: [
          {
            required: true,
            message: "Please select book",
            trigger: "change",
          },
        ],
        name: [
          {
            required: true,
            message: "Please input author name",
            trigger: "blur",
          },
          {
            min: 1,
            max: 50,
            message: "Length should between 1 and 50",
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
    // get book list
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
    createData(formEl: FormInstance | undefined): void {
      //
      this.input.author_BookID = this.ruleForm.id;
      this.input.authorName = this.ruleForm.name;
      // input validation
      if (!formEl) return;
      formEl.validate((valid, fields) => {
        if (!valid) {
          // open error notification
          requestMessage("error", "Insert", "confirm");
          console.log("submits!", fields);
          return;
        }
      });
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
        author_BookID: 0,
        authorName: "",
      };
    },
    // submit form
    submitForm(formEl: FormInstance | undefined) {
      if (!formEl) return;
      formEl.validate((valid, fields) => {
        if (!valid) {
          // open error notification
          requestMessage("error", "Insert", "confirm");
          console.log("error submit!", fields);
          return;
        }
      });
    },
  },
  created() {
    this.getDataFromApi();
  },
});
</script>

<style src="@/assets/css/insert-style.css"></style>
