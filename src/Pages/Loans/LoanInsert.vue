<template>
  <div v-if="show" class="insert-box">
    <div class="box-header">
      <p>Create new loan order</p>
    </div>
    <div class="form">
      <div class="form-group databox">
        <label>Book ID: </label>
        <input
          v-model="input.book_loans_BookID"
          type="text"
          name="book_id"
          id="book_id"
          placeholder="Please enter book ID..."
        />
      </div>
      <div class="form-group databox">
        <label>Branch ID: </label>
        <input
          v-model="input.book_loans_BranchID"
          type="text"
          name="branch_id"
          id="branch_id"
          placeholder="Please enter branch ID..."
        />
      </div>
      <div class="form-group databox">
        <label>Borrower ID: </label>
        <input
          v-model="input.book_loans_CardNo"
          type="text"
          name="borrower_id"
          id="borrower_id"
          placeholder="Please enter borrower ID..."
        />
      </div>
      <div class="form-group databox">
        <label>Loan date: </label>
        <input
          v-model="input.book_loans_DateOut"
          type="date"
          name="loan_date"
          id="loan_date"
        />
      </div>
      <div class="form-group databox">
        <label>Due date: </label>
        <input
          v-model="input.book_loans_DueDate"
          type="date"
          name="due_date"
          id="due_date"
        />
      </div>
      <div class="form-group databox">
        <label>Loan order status: </label>
        <input
          v-model="input.book_loans_Status"
          type="text"
          name="loan_status"
          id="loan_status"
          placeholder="Please enter loan status (In progress/Done)..."
        />
      </div>
      <div class="form-group button">
        <input
          type="button"
          name="btnCreate"
          id="btnCreate"
          value="CREATE"
          @click="$emit('close'), createLoan()"
        />
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
      baseURL: "https://localhost:7123/api/publishers/",
      data: null,
      input: {
        book_loans_BookID: null,
        book_loans_BranchID: null,
        book_loans_CardNo: null,
        book_loans_DateOut: null,
        book_loans_DueDate: null,
        book_loans_Status: null,
      },
    };
  },
  props: {
    show: Boolean,
  },
  methods: {
    createLoan(): void {
      axios
        .post(this.baseURL, this.input)
        .then((response) => {
          this.data = response.data;
          alert("Loan order is created successfully!");
          this.clearData();
        })
        .catch((error) => {
          console.log(error);
          this.clearData();
        });
    },
    clearData(): void {
      this.input.book_loans_BookID = null;
      this.input.book_loans_BranchID = null;
      this.input.book_loans_CardNo = null;
      this.input.book_loans_DateOut = null;
      this.input.book_loans_DueDate = null;
      this.input.book_loans_Status = null;
    },
  },
});
</script>


<style src="@/assets/css/insert-style.css" scoped></style>