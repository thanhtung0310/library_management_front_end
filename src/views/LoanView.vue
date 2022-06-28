<template>
  <div class="loans">
    <h1>LOAN ORDERS</h1>
    <table class="table">
      <thead>
        <tr>
          <th>Loan ID</th>
          <th>Book ID</th>
          <th>Branch ID</th>
          <th>Customer's ID</th>
          <th>Loan date</th>
          <th>Due date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in data" :key="index">
          <td v-text="row.book_loans_LoansID"></td>
          <td v-text="row.book_loans_BookID"></td>
          <td v-text="row.book_loans_BranchID"></td>
          <td v-text="row.book_loans_CardNo"></td>
          <td v-text="row.book_loans_DateOut"></td>
          <td v-text="row.book_loans_DueDate"></td>
          <td v-text="row.book_loans_Status"></td>
          <td>
            <font-awesome-icon class="icon" icon="fa-solid fa-circle-info" />
          </td>
          <td>
            <font-awesome-icon class="icon" icon="fa-solid fa-ban" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "LoanView",
  components: {},
  data() {
    return {
      data: null,
      URL: "https://localhost:7123/api/loans/",
      showModal: false,
    };
  },
  methods: {
    getData(): void {
      axios
        .get(this.URL)
        .then((response) => (this.data = response.data))
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.getData();
  },
});
</script>

<style src="@/assets/css/table-style.css"></style>