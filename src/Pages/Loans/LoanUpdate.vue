<template>
  <div class="update-box">
    <div class="box-header">
      <p>Update loan order with id {{ loanID }}</p>
    </div>
    <div class="form">
      <div class="form-group databox">
        <label>Book ID: </label>
        <input
          :value="bookID"
          type="text"
          name="book_id"
          id="book_id"
          placeholder="Please update book ID..."
        />
      </div>
      <div class="form-group databox">
        <label>Branch ID: </label>
        <input
          :value="branchID"
          type="text"
          name="branch_id"
          id="branch_id"
          placeholder="Please update branch ID..."
        />
      </div>
      <div class="form-group databox">
        <label>Borrower ID: </label>
        <input
          :value="borrowerID"
          type="text"
          name="borrower_id"
          id="borrower_id"
          placeholder="Please update borrower ID..."
        />
      </div>
      <div class="form-group databox">
        <label>Loan date: </label>
        <input
          :value="loanDate"
          type="date"
          name="loan_date"
          id="loan_date"
          placeholder="mm-dd-yyyy"
        />
      </div>
      <div class="form-group databox">
        <label>Due date: </label>
        <input
          :value="dueDate"
          type="date"
          name="due_date"
          id="due_date"
          placeholder="mm-dd-yyyy"
        />
      </div>
      <div class="form-group databox">
        <label>Loan status: </label>
        <input
          :value="loanStatus"
          type="text"
          name="loan_status"
          id="loan_status"
          placeholder="Please update loan status (In Progress/Done)..."
        />
      </div>
      <div class="form-group button">
        <input
          type="button"
          name="btnUpdate"
          id="btnUpdate"
          value="UPDATE"
          @click="$emit('close'), updateData()"
        />
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
      baseURL: "https://localhost:7123/api/loans/",
      input: {
        book_loans_BookID: this.publisherAddr,
        book_loans_BranchID: this.publisherNo,
        book_loans_CardNo: this.publisherNo,
        book_loans_DateOut: this.publisherNo,
        book_loans_DueDate: this.publisherNo,
        book_loans_Status: this.publisherNo,
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
  },
  methods: {
    updateData(): void {
      // parse dữ liệu sang dạng JSON
      const modelParse = JSON.parse(JSON.stringify(this.input));

      // gọi API update
      axios
        .put(this.baseURL + this.loanID, modelParse)
        .then(() => {
          alert("Success update publisher with id = " + this.loanID);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>

<style src="@/assets/css/update-style.css" scoped></style>