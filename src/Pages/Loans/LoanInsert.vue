<template>
  <div class="insert-box">
    <el-form ref="ruleFormRef" :rules="rules">
      <div class="box-header">
        <p>{{ $t("message.create_message", { table: "loan order" }) }}</p>
      </div>

      <el-form-item prop="id1">
        <template #label>{{ $t("loans.book_id") }}: </template>
        <el-select
          v-model="ruleForm.id1"
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
      <el-form-item class="link">
        <router-link to="/books/insert">{{
          $t("message.create_message", { table: "book" })
        }}</router-link>
      </el-form-item>

      <el-form-item prop="id2">
        <template #label>{{ $t("loans.branch_id") }}: </template>
        <el-select
          v-model="ruleForm.id2"
          placeholder="Select branch"
          style="width: 100%"
        >
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
      <el-form-item class="link">
        <router-link to="/branches/insert">{{
          $t("message.create_message", { table: "branch" })
        }}</router-link>
      </el-form-item>

      <el-form-item prop="id3">
        <template #label>{{ $t("loans.borrower_id") }}: </template>
        <el-select
          v-model="ruleForm.id3"
          placeholder="Select borrower"
          style="width: 100%"
        >
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
      <el-form-item class="link">
        <router-link to="/borrowers/insert">{{
          $t("message.create_message", { table: "borrower" })
        }}</router-link>
      </el-form-item>

      <el-form-item prop="date1">
        <template #label>{{ $t("loans.loan_date") }}: </template>
        <el-input v-model="ruleForm.date1" type="date" />
      </el-form-item>

      <el-form-item prop="date2">
        <template #label>{{ $t("loans.due_date") }}: </template>
        <el-input v-model="ruleForm.date2" type="date" />
      </el-form-item>

      <el-form-item prop="status">
        <template #label>{{ $t("loans.loan_status") }}: </template>
        <el-radio-group v-model="ruleForm.status">
          <el-radio label="In Progress" />
          <el-radio label="Done" />
        </el-radio-group>
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
import { FormInstance, FormRules } from "element-plus";
import { requestMessage, serverNotification } from "@/axios-functions";

export default defineComponent({
  name: "loan_insert",
  data() {
    return {
      ruleFormRef: ref<FormInstance>(),
      book_baseURL: "https://localhost:7123/api/branches/",
      book_list: [],
      branch_baseURL: "https://localhost:7123/api/books/",
      branch_list: [],
      borrower_baseURL: "https://localhost:7123/api/borrowers/",
      borrower_list: [],
      input: {
        loan_BookID: ref(0),
        loan_BranchID: ref(0),
        loan_BorrowerID: ref(0),
        loanDate: ref(""),
        dueDate: ref(""),
        loanStatus: ref(""),
      },
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
    baseURL: {
      type: String,
      default: "",
    },
  },
  methods: {
    // get branch list
    getDataFromApi(): void {
      // call axios get callback - book
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

      // call axios get callback - branch
      axios
        .get(this.branch_baseURL)
        .then((response) => {
          if (response.data != null) {
            this.branch_list = response.data;
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

      // call axios get callback - borrower
      axios
        .get(this.borrower_baseURL)
        .then((response) => {
          if (response.data != null) {
            this.borrower_list = response.data;
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
    // create new loan order in database
    createData(formEl: FormInstance | undefined): void {
      //
      this.input.loan_BookID = this.ruleForm.id1;
      this.input.loan_BranchID = this.ruleForm.id2;
      this.input.loan_BorrowerID = this.ruleForm.id3;
      this.input.loanDate = this.ruleForm.date1;
      this.input.dueDate = this.ruleForm.date2;
      this.input.loanStatus = this.ruleForm.status;
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
        loan_BookID: 0,
        loan_BranchID: 0,
        loan_BorrowerID: 0,
        loanDate: "",
        dueDate: "",
        loanStatus: "",
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
      });
    },
  },
  created() {
    this.getDataFromApi();
  },
});
</script>

<style src="@/assets/css/insert-style.css"></style>
