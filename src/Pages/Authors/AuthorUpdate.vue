<template>
  <div class="update-box">
    <el-form ref="ruleFormRef" :rules="rules">
      <div class="box-header">
        <p>
          {{ $t("message.update_message", { table: "author" }) }} {{ authorID }}
        </p>
      </div>

      <el-form-item prop="id">
        <template #label>{{ $t("authors.book_id") }}: </template>
        <el-select v-model="ruleForm.id" style="width: 100%">
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
        <el-input v-model="ruleForm.name" type="text" />
      </el-form-item>

      <el-form-item class="button-group">
        <el-button type="success" @click="updateData()" round>
          {{ $t("message.update_header") }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import axios from "axios";
import { ElMessageBox } from "element-plus";
import type { Action } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { serverNotification, requestMessage } from "@/axios-functions";

export default defineComponent({
  name: "author_update",
  data() {
    return {
      ruleFormRef: ref<FormInstance>(),
      input: {
        authorID: ref(0),
        author_BookID: ref(0),
        authorName: ref(""),
      },
      book_baseURL: "https://localhost:7123/api/books/",
      book_list: [],
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
    authorID: {
      default: ref(0),
      type: Number,
    },
    bookID: {
      default: ref(0),
      type: Number,
    },
    authorName: {
      default: ref(""),
      type: String,
    },
    baseURL: {
      default: "",
      type: String,
    },
    runMethod: Boolean,
  },
  methods: {
    getDataFromParentComp(): void {
      this.ruleForm.id = this.bookID;
      this.ruleForm.name = this.authorName;
    },
    // get book list
    getDataFromApi(): void {
      // call axios get callback
      axios
        .get(this.book_baseURL)
        .then((response) => {
          if (!response) {
            // open warning notification
            serverNotification("warning");
            return;
          }
          this.book_list = response.data;
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
      this.input.authorID = this.authorID;
      this.input.author_BookID = this.ruleForm.id;
      this.input.authorName = this.ruleForm.name;

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
            .put(this.baseURL + this.authorID, body, { headers })
            .then(() => {
              // open success notification
              requestMessage("success", "Update", "confirm");
              this.$emit("refresh");
              this.$emit("close");
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
});
</script>

<style src="@/assets/css/update-style.css"></style>
