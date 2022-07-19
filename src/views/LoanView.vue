<template>
  <div class="loans">
    <h1>{{ $t("message.view_header", { table: "LOAN ORDER" }) }}</h1>
    <div class="insert-div" id="insert-div">
      <button
        id="btnInsertPage"
        @click="goToInsertPage(), (showModal = !showModal)"
      >
        {{ $t("message.create_message", { table: "loan order" }) }}
      </button>
      <router-view 
        :show="showModal" 
        :baseURL="baseURL" 
        @close="showModal = false"
      ></router-view>
    </div>

    <div class="update-div" id="update-div" style="display: none">
      <Update
        :loanID="output.loanID"
        :bookID="output.loan_BookID"
        :branchID="output.loan_BranchID"
        :borrowerID="output.loan_BorrowerID"
        :loanDate="output.loanDate"
        :dueDate="output.dueDate"
        :loanStatus="output.loanStatus"
        :baseURL="baseURL"
      ></Update>
    </div>

    <div class="table-view">
      <table class="table">
        <thead>
          <tr>
            <th>{{ $t("loans.loan_id") }}</th>
            <th>{{ $t("loans.book_id") }}</th>
            <th>{{ $t("loans.branch_id") }}</th>
            <th>{{ $t("loans.borrower_id") }}</th>
            <th>{{ $t("loans.loan_date") }}</th>
            <th>{{ $t("loans.due_date") }}</th>
            <th>{{ $t("loans.loan_status") }}</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in loans" :key="index">
            <td>{{ row.loanID }}</td>
            <td>{{ row.loan_BookID }}</td>
            <td>{{ row.loan_BranchID }}</td>
            <td>{{ row.loan_BorrowerID }}</td>
            <td>{{ row.loanDate }}</td>
            <td>{{ row.dueDate }}</td>
            <td>{{ row.loanStatus }}</td>
            <td
              @click="passDatatoUpdatePage(row), scrollToAnchor('update-div')"
            >
              <font-awesome-icon class="icon" icon="fa-solid fa-circle-info" />
            </td>
            <td @click="deleteData(row)">
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
      loans: null,
      output: {
        loanID: Number,
        loan_BookID: Number,
        loan_BranchID: Number,
        loan_BorrowerID: Number,
        loanDate: String,
        dueDate: String,
        loanStatus: String,
      },
      showModal: false,
    };
  },
  methods: {
    // call to insert page
    goToInsertPage() {
      this.$router.push("/loans/insert");
    },
    // go to id div
    scrollToAnchor(element: string): void {
      location.hash = "#" + element;
    },
    // get datable from database
    getDataFromApi(): void {
      // call axios get callback
      axios
        .get(this.baseURL)
        .then((response) => {
          if (response.data != null) this.loans = response.data;
          else alert("No data is loaded into table!");
        })
        .catch((error) => {
          alert("Cannot connect to server...");
          console.log(error);
        });
    },
    // pass data from parent comp to child comp
    passDatatoUpdatePage(model: undefined): void {
      // parsing data into Json format
      this.output = JSON.parse(JSON.stringify(model));

      // display update modal
      const updateDiv = document.getElementById("update-div");
      if (updateDiv != null) {
        if (updateDiv.style.display == "none")
          updateDiv.style.display = "block";
        else if (updateDiv.style.display == "block")
          updateDiv.style.display = "block";
        else updateDiv.style.display = "none";
      }
    },
    // delete data from datatable with id
    deleteData(model: undefined): void {
      // parsing data into Json format
      this.output = JSON.parse(JSON.stringify(model));

      // call axios delete callback
      axios
        .delete(this.baseURL + this.output.loanID)
        .then(() => {
          alert("Success delete loan order with id = " + this.output.loanID);
        })
        .catch((error) => {
          alert("Cannot connect to server...");
          console.log(error);
        });
    },
  },
  created() {
    this.getDataFromApi();
  },
});
</script>

<style src="@/assets/css/table-style.css"></style>