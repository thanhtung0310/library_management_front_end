<template>
  <div class="update-box">
    <!-- form class = "el-form el-form--default el-form--label-right" -->
    <!-- button class = "el-button el-button--success is-round" -->
    <div class="box-header">
      <p>
        {{ $t("message.update_message", { table: "loan order" }) }} {{ loanID }}
      </p>
    </div>
    <div class="form">
      <div class="el-form-item__content">
        <label>{{ $t("loans.book_id") }}: </label>
        <input
          :value="bookID"
          type="text"
          name="book_id"
          id="book_id"
          class="el-input__inner"
          placeholder="Please update book ID..."
        />
      </div>
      <div class="form-group databox">
        <label>{{ $t("loans.branch_id") }}: </label>
        <input
          :value="branchID"
          type="text"
          name="branch_id"
          id="branch_id"
          placeholder="Please update branch ID..."
        />
      </div>
      <div class="form-group databox">
        <label>{{ $t("loans.borrower_id") }}: </label>
        <input
          :value="borrowerID"
          type="text"
          name="borrower_id"
          id="borrower_id"
          placeholder="Please update borrower ID..."
        />
      </div>
      <div class="form-group databox">
        <label>{{ $t("loans.loan_date") }}: </label>
        <input
          :value="loanDate"
          type="date"
          name="loan_date"
          id="loan_date"
          placeholder="mm-dd-yyyy"
        />
      </div>
      <div class="form-group databox">
        <label>{{ $t("loans.due_date") }}: </label>
        <input
          :value="dueDate"
          type="date"
          name="due_date"
          id="due_date"
          placeholder="mm-dd-yyyy"
        />
      </div>
      <div class="form-group databox">
        <label>{{ $t("loans.loan_status") }}: </label>
        <input
          :value="loanStatus"
          type="text"
          name="loan_status"
          id="loan_status"
          placeholder="Please update loan status (In Progress/Done)..."
        />
      </div>
      <div class="form-group button">
        <button type="submit" @click="$emit('close'), updateData()">
          {{ $t("message.update_header") }}
        </button>
      </div>
    </div>
  </div>
</template>
>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
import type { Action } from "element-plus";

export default defineComponent({
  name: "publisher_update",
  data() {
    return {
      input: {
        loanID: this.loanID,
        loan_BookID: this.bookID,
        loan_BranchID: this.branchID,
        loan_BorrowerID: this.borrowerID,
        loanDate: this.loanDate,
        dueDate: this.dueDate,
        loanStatus: this.loanStatus,
      },
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
  },
  methods: {
    // update new data into database
    updateData(): void {
      // parsing data from parent comp to child comp
      this.input.loanID = this.loanID;
      this.input.loan_BookID = this.bookID;
      this.input.loan_BranchID = this.branchID;
      this.input.loan_BorrowerID = this.borrowerID;
      this.input.loanDate = this.loanDate;
      this.input.dueDate = this.dueDate;
      this.input.loanStatus = this.loanStatus;

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
              ElMessage({
                type: "success",
                message: "Completely update ID " + this.loanID + "!",
              });
              this.$emit("refresh");
              this.$emit("close");
              console.log(body);
            })
            .catch((error) => {
              // open error notification
              ElMessage({
                type: "error",
                message: "Update process failed! Please try again.",
              });
              console.log(error);
            });
        })
        .catch((action: Action) => {
          ElMessage({
            type: "info",
            message:
              action === "cancel"
                ? "Update process cancelled!"
                : "Nothing happen :3",
          });
        });
    },
  },
});
</script>

<style src="@/assets/css/update-style.css"></style>
