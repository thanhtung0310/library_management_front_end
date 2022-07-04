<template>
  <div class="loans">
    <h1>LOAN ORDERS</h1>
    <div class="insert-div" id="insert-div">
      <button
        id="btnInsertPage"
        @click="goToInsertPage(), (showModal = !showModal)"
      >
        Create new loan order
      </button>
      <router-view :show="showModal" @close="showModal = false"></router-view>
    </div>

    <div class="update-div" id="update-div">
      <Update
        :loanID="output.book_loans_LoansID"
        :bookID="output.book_loans_BookID"
        :branchID="output.book_loans_BranchID"
        :borrowerID="output.book_loans_CardNo"
        :loanDate="output.book_loans_DateOut"
        :dueDate="output.book_loans_DueDate"
        :loanStatus="output.book_loans_Status"
      ></Update>
    </div>

    <div class="table-view">
      <table class="table">
        <thead>
          <tr>
            <th>Loan ID</th>
            <th>Book ID</th>
            <th>Branch ID</th>
            <th>Borrower ID</th>
            <th>Loan date</th>
            <th>Due date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in data" :key="index">
            <td>{{ row.book_loans_LoansID }}</td>
            <td>{{ row.book_loans_BookID }}</td>
            <td>{{ row.book_loans_BranchID }}</td>
            <td>{{ row.book_loans_CardNo }}</td>
            <td>{{ row.book_loans_DateOut }}</td>
            <td>{{ row.book_loans_DueDate }}</td>
            <td>{{ row.book_loans_Status }}</td>
            <td @click="passDatatoUpdatePage(row)">
              <font-awesome-icon class="icon" icon="fa-solid fa-circle-info" />
            </td>
            <td @click="passDatatoDeletePage(row)">
              <font-awesome-icon class="icon" icon="fa-solid fa-ban" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import Update from "@/pages/Loans/LoanUpdate.vue";

export default defineComponent({
  name: "LoanView",
  components: {
    Update,
  },
  data() {
    return {
      baseURL: "https://localhost:7123/api/loans/",
      data: null,
      output: {
        book_loans_LoansID: Number,
        book_loans_BookID: Number,
        book_loans_BranchID: Number,
        book_loans_CardNo: Number,
        book_loans_DateOut: String,
        book_loans_DueDate: String,
        book_loans_Status: String,
      },
      showModal: false,
    };
  },
  methods: {
    goToInsertPage() {
      this.$router.push("/loan_insert");
    },
    getDataFromApi(): void {
      axios
        .get(this.baseURL)
        .then((response) => {
          this.data = response.data;
        })
        .catch((error) => console.log(error));
    },
    passDatatoUpdatePage(model: undefined): void {
      // parse dữ liệu sang dạng JSON
      const modelParse = JSON.parse(JSON.stringify(model));
      this.output = modelParse;

      // display updateDiv mỗi khi ấn nút details (default: display=none)
      const updateDiv = document.getElementById("update-div");
      if (updateDiv != null) {
        if (updateDiv.style.display == "none")
          updateDiv.style.display = "block";
        else if (updateDiv.style.display == "block")
          updateDiv.style.display = "block";
        else updateDiv.style.display = "none";
      }
    },
    passDatatoDeletePage(model: undefined): void {
      // parse dữ liệu sang dạng JSON
      const modelParse = JSON.parse(JSON.stringify(model));
      this.output = modelParse;

      // gọi API delete
      axios
        .delete(this.baseURL + this.output.book_loans_LoansID)
        .then((response) => {
          this.data = response.data;
          // alert("Success delete book with id = " + this.output.book_BookID);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getDataFromApi();
  },
});
</script>

<style src="@/assets/css/table-style.css"></style>