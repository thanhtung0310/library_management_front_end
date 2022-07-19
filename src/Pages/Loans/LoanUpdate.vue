<template>
  <div class="update-box">
    <div class="box-header">
      <p>
        {{ $t("message.update_message", { table: "loan order" }) }} {{ loanID }}
      </p>
    </div>
    <div class="form">
      <div class="form-group databox">
        <label>{{ $t("loans.book_id") }}: </label>
        <input
          :value="bookID"
          type="text"
          name="book_id"
          id="book_id"
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
</template>>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "publisher_update",
  data() {
    return {
      // baseURL: "https://localhost:7123/api/loans/",
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
      default: 0,
      type: Number,
    },
    bookID: {
      default: 0,
      type: Number,
    },
    branchID: {
      default: 0,
      type: Number,
    },
    borrowerID: {
      default: 0,
      type: Number,
    },
    loanDate: {
      default: "",
      type: String,
    },
    dueDate: {
      default: "",
      type: String,
    },
    loanStatus: {
      default: "",
      type: String,
    },
    baseURL: {
      type: String, 
      default: "",
    }
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

      // call axios put callback
      axios
        .put(this.baseURL + this.loanID, body, { headers })
        .then(() => {
          alert("Success update loan order with id = " + this.loanID);
        })
        .catch((error) => {
          alert("Cannot connect to server...");
          console.log(error);
        });
    },
  },
});
</script>

<style src="@/assets/css/update-style.css"></style>