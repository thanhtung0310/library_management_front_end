<template>
  <div v-if="show" class="insert-box">
    <div class="box-header">
      <p>{{ $t("message.create_message", { table: "loan order" }) }}</p>
    </div>
    <div class="form">
      <div class="form-group databox">
        <label>{{ $t("loans.book_id") }}: </label>
        <input
          v-model="input.loan_BookID"
          type="text"
          name="book_id"
          id="book_id"
          placeholder="Please enter book ID..."
        />
      </div>
      <div class="form-group databox">
        <label>{{ $t("loans.branch_id") }}: </label>
        <input
          v-model="input.loan_BranchID"
          type="text"
          name="branch_id"
          id="branch_id"
          placeholder="Please enter branch ID..."
        />
      </div>
      <div class="form-group databox">
        <label>{{ $t("loans.borrower_id") }}: </label>
        <input
          v-model="input.loan_BorrowerID"
          type="text"
          name="borrower_id"
          id="borrower_id"
          placeholder="Please enter borrower ID..."
        />
      </div>
      <div class="borrower-create">
        <router-link to="/borrowers/insert">{{
          $t("message.create_message", { table: "borrower" })
        }}</router-link>
      </div>
      <div class="form-group databox">
        <label>{{ $t("loans.loan_date") }}: </label>
        <input
          v-model="input.loanDate"
          type="date"
          name="loan_date"
          id="loan_date"
        />
      </div>
      <div class="form-group databox">
        <label>{{ $t("loans.due_date") }}: </label>
        <input
          v-model="input.dueDate"
          type="date"
          name="due_date"
          id="due_date"
        />
      </div>
      <!-- options = 'Done/In Progress' -->
      <div class="form-group databox">
        <label>{{ $t("loans.loan_status") }}: </label>
        <input
          v-model="input.loanStatus"
          type="text"
          name="loan_status"
          id="loan_status"
          placeholder="Please enter loan status (In progress/Done)..."
        />
      </div>
      <div class="form-group button">
        <button type="submit" @click="$emit('close'), createData()">
          {{ $t("message.create_header") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "loan_insert",
  data() {
    return {
      // use proc
      // baseURL: "https://localhost:7123/api/loans/",
      input: {
        loan_BookID: null,
        loan_BranchID: null,
        loan_BorrowerID: null,
        loanDate: null,
        dueDate: null,
        loanStatus: null,
      },
    };
  },
  props: {
    show: Boolean,
    baseURL: {
      type: String, 
      default: "",
    }
  },
  methods: {
    // create new loan order in database
    createData(): void {
      // call axios post callback
      axios
        .post(this.baseURL, this.input)
        .then(() => {
          alert("New loan order is created successfully!");
          this.clearData();
        })
        .catch((error) => {
          alert("Cannot connect to server...");
          this.clearData();
          console.log(error);
        });
    },
    // clear input data
    clearData(): void {
      this.input.loan_BookID = null;
      this.input.loan_BranchID = null;
      this.input.loan_BorrowerID = null;
      this.input.loanDate = null;
      this.input.dueDate = null;
      this.input.loanStatus = null;
    },
  },
});
</script>


<style src="@/assets/css/insert-style.css"></style>