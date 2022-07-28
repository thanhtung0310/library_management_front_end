<template>
  <div class="update-box">
    <el-form>
      <div class="box-header">
        <p>
          {{ $t("message.update_message", { table: "loan order" }) }}
          {{ loanID }}
        </p>
      </div>

      <el-form-item>
        <label>{{ $t("loans.book_id") }}: </label>
        <el-select v-model="bookID_value" style="width: 100%">
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

      <el-form-item>
        <label>{{ $t("loans.branch_id") }}: </label>
        <el-select v-model="branchID_value" style="width: 100%">
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

      <el-form-item>
        <label>{{ $t("loans.borrower_id") }}: </label>
        <el-select v-model="borrowerID_value" style="width: 100%">
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

      <el-form-item>
        <label>{{ $t("loans.loan_date") }}: </label>
        <el-input v-model="loanDate_value" type="date" />
      </el-form-item>

      <el-form-item>
        <label>{{ $t("loans.due_date") }}: </label>
        <el-input v-model="dueDate_value" type="date" />
      </el-form-item>

      <el-form-item>
        <label>{{ $t("loans.loan_status") }}: </label>
        <el-radio-group v-model="loanStatus_value">
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
import { defineComponent, ref } from "vue";
import axios from "axios";
import { ElMessageBox } from "element-plus";
import type { Action } from "element-plus";
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
      book_list: null,
      branch_baseURL: "https://localhost:7123/api/branches/",
      branch_list: null,
      borrower_baseURL: "https://localhost:7123/api/borrowers/",
      borrower_list: null,
      bookID_value: ref(0),
      branchID_value: ref(0),
      borrowerID_value: ref(0),
      loanDate_value: ref(""),
      dueDate_value: ref(""),
      loanStatus_value: ref(""),
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
      this.bookID_value = this.bookID;
      this.branchID_value = this.branchID;
      this.borrowerID_value = this.borrowerID;
      this.loanDate_value = this.loanDate;
      this.dueDate_value = this.dueDate;
      this.loanStatus_value = this.loanStatus;
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
      this.input.loan_BookID = this.bookID_value;
      this.input.loan_BranchID = this.branchID_value;
      this.input.loan_BorrowerID = this.borrowerID_value;
      this.input.loanDate = this.loanDate_value;
      this.input.dueDate = this.dueDate_value;
      this.input.loanStatus = this.loanStatus_value;

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
