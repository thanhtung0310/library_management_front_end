<template>
  <div class="insert-box">
    <el-form ref="ruleFormRef" :modal="input" :rules="rules">
      <div class="box-header">
        <p>{{ $t("message.create_message", { table: "loan order" }) }}</p>
      </div>

      <el-form-item prop="id1">
        <label>{{ $t("loans.book_id") }}: </label>
        <el-select
          v-model="input.loan_BookID"
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
        <label>{{ $t("loans.branch_id") }}: </label>
        <el-select
          v-model="input.loan_BranchID"
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
        <label>{{ $t("loans.borrower_id") }}: </label>
        <el-select
          v-model="input.loan_BorrowerID"
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
        <label>{{ $t("loans.loan_date") }}: </label>
        <el-input v-model="input.loanDate" type="date" />
      </el-form-item>

      <el-form-item prop="date2">
        <label>{{ $t("loans.due_date") }}: </label>
        <el-input v-model="input.dueDate" type="date" />
      </el-form-item>

      <!-- lỗi style - không hiện button -->
      <el-form-item prop="status">
        <label>{{ $t("loans.loan_status") }}: </label>
        <el-radio-group v-model="input.loanStatus">
          <el-radio label="In Progress" />
          <el-radio label="Done" />
        </el-radio-group>
      </el-form-item>

      <el-form-item class="button-group">
        <el-button type="success" @click="updateData()" round>
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
      book_list: null,
      branch_baseURL: "https://localhost:7123/api/books/",
      branch_list: null,
      borrower_baseURL: "https://localhost:7123/api/borrowers/",
      borrower_list: null,
      input: {
        loan_BookID: ref(""),
        loan_BranchID: ref(""),
        loan_BorrowerID: ref(""),
        loanDate: ref(""),
        dueDate: ref(""),
        loanStatus: ref(""),
      },
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
    createData(): void {
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
        loan_BookID: "",
        loan_BranchID: "",
        loan_BorrowerID: "",
        loanDate: "",
        dueDate: "",
        loanStatus: "",
      };
    },
    // submit form
    submitForm(formEl: FormInstance | undefined) {
      if (!formEl) return;
      formEl.validate((valid, fields) => {
        if (valid) {
          this.createData();
        } else {
          // open error notification
          requestMessage("error", "Insert", "confirm");
          console.log("error submit!", fields);
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
