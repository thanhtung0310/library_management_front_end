<template>
  <div class="update-box">
    <el-form ref="ruleFormRef" :rules="rules">
      <div class="box-header">
        <p>
          {{ $t("message.update_message", { table: "loan order" }) }}
          {{ loanID }}
        </p>
      </div>

      <el-form-item prop="id1">
        <template #label> {{ $t("loans.book_id") }}: </template>
        <el-select v-model="ruleForm.id1" style="width: 100%">
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

      <el-form-item prop="id2">
        <template #label>{{ $t("loans.branch_id") }}: </template>
        <el-select v-model="ruleForm.id2" style="width: 100%">
          <el-option
            v-for="item in branch_list"
            :key="item.branchID"
            :label="item.branchName"
            :value="item.branchID"
          >
            <span style="float: left">{{ item.branchName }}</span>
            <span
              style="
                float: right;
                color: var(--el-text-color-secondary);
                font-size: 13px;
              "
              >{{ item.branchID }}</span
            >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="id3">
        <template #label>{{ $t("loans.borrower_id") }}: </template>
        <el-select v-model="ruleForm.id3" style="width: 100%">
          <el-option
            v-for="item in borrower_list"
            :key="item.borrowerID"
            :label="item.borrowerName"
            :value="item.borrowerID"
          >
            <span style="float: left">{{ item.borrowerName }}</span>
            <span
              style="
                float: right;
                color: var(--el-text-color-secondary);
                font-size: 13px;
              "
              >{{ item.borrowerID }}</span
            >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="date1">
        <label>{{ $t("loans.loan_date") }}: </label>
        <el-input v-model="ruleForm.date1" type="date" />
      </el-form-item>

      <el-form-item prop="date2">
        <label>{{ $t("loans.due_date") }}: </label>
        <el-input v-model="ruleForm.date2" type="date" />
      </el-form-item>

      <el-form-item prop="status">
        <label>{{ $t("loans.loan_status") }}: </label>
        <el-radio-group v-model="ruleForm.status">
          <el-radio label="In Progress" />
          <el-radio label="Done" />
        </el-radio-group>
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
  name: "publisher_update",
  data() {
    return {
      input: {
        loanID: ref(0),
        loan_BookID: ref(0),
        loan_BranchID: ref(0),
        loan_BorrowerID: ref(0),
        loanDate: ref(""),
        dueDate: ref(""),
        loanStatus: ref(""),
      },
      book_baseURL: "https://localhost:7123/api/books/",
      book_list: [],
      branch_baseURL: "https://localhost:7123/api/branches/",
      branch_list: [],
      borrower_baseURL: "https://localhost:7123/api/borrowers/",
      borrower_list: [],
      ruleForm: reactive({
        id1: 0,
        id2: 0,
        id3: 0,
        date1: "",
        date2: "",
        status: "",
      }),
      rules: reactive<FormRules>({
        id1: [
          {
            required: true,
            message: "Please select book",
            trigger: "change",
          },
        ],
        id2: [
          {
            required: true,
            message: "Please select branch",
            trigger: "change",
          },
        ],
        id3: [
          {
            required: true,
            message: "Please select borrower",
            trigger: "change",
          },
        ],
        date1: [
          {
            required: true,
            type: "date",
            message: "Please pick loan date (today)",
            trigger: "change",
          },
        ],
        date2: [
          {
            required: true,
            type: "date",
            message: "Please pick due date (a month later)",
            trigger: "change",
          },
        ],
        status: [
          {
            required: true,
            type: "boolean",
            message: "Please select order status",
            trigger: "change",
          },
        ],
      }),
    };
  },
  props: {
    loanID: {
      default: ref(0),
      type: Number,
    },
    bookID: {
      default: ref(0),
      type: Number,
    },
    branchID: {
      default: ref(0),
      type: Number,
    },
    borrowerID: {
      default: ref(0),
      type: Number,
    },
    loanDate: {
      default: ref(""),
      type: String,
    },
    dueDate: {
      default: ref(""),
      type: String,
    },
    loanStatus: {
      default: ref(""),
      type: String,
    },
    baseURL: {
      default: ref(""),
      type: String,
    },
    runMethod: Boolean,
  },
  methods: {
    getDataFromParentComp(): void {
      this.ruleForm.id1 = this.bookID;
      this.ruleForm.id2 = this.branchID;
      this.ruleForm.id3 = this.borrowerID;
      this.ruleForm.date1 = this.loanDate;
      this.ruleForm.date2 = this.dueDate;
      this.ruleForm.status = this.loanStatus;
    },
    // get drop-down list - book, branch, borrower
    getDataFromApi(): void {
      // call axios get callback - book
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
      // call axios get callback - branch
      axios
        .get(this.branch_baseURL)
        .then((response) => {
          if (!response) {
            // open warning notification
            serverNotification("warning");
            return;
          }
          this.branch_list = response.data;
        })
        .catch((error) => {
          // open error notification
          serverNotification("error");
          console.log(error);
        });
      // call axios get callback - borrower
      axios
        .get(this.borrower_baseURL)
        .then((response) => {
          if (!response) {
            // open warning notification
            serverNotification("warning");
            return;
          }
          this.borrower_list = response.data;
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
      this.input.loanID = this.loanID;
      this.input.loan_BookID = this.ruleForm.id1;
      this.input.loan_BranchID = this.ruleForm.id2;
      this.input.loan_BorrowerID = this.ruleForm.id3;
      this.input.loanDate = this.ruleForm.date1;
      this.input.dueDate = this.ruleForm.date2;
      this.input.loanStatus = this.ruleForm.status;

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
            .put(this.baseURL + this.loanID, body, { headers })
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
