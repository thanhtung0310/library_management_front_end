<template>
  <div class="loans">
    <h1>{{ $t("message.view_header", { table: "LOAN ORDER" }) }}</h1>

    <el-button @click="showInsertModal()" round>
      {{ $t("message.create_message", { table: "loan order" }) }}
    </el-button>

    <div class="insert-div" id="insert-div" style="display: none">
      <InsertModal
        :baseURL="baseURL"
        @refresh="getDataFromApi"
        @close="close('insert-div')"
      ></InsertModal>
    </div>

    <div class="update-div" id="update-div" style="display: none">
      <UpdateModal
        :loanID="output.loanID"
        :bookID="output.loan_BookID"
        :branchID="output.loan_BranchID"
        :borrowerID="output.loan_BorrowerID"
        :loanDate="output.loanDate"
        :dueDate="output.dueDate"
        :loanStatus="output.loanStatus"
        :baseURL="baseURL"
        @refresh="getDataFromApi"
        @close="close('update-div')"
      ></UpdateModal>
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
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
import type { Action } from "element-plus";
import UpdateModal from "@/pages/Loans/LoanUpdate.vue";
import InsertModal from "@/pages/Loans/LoanInsert.vue";
import {
  scrollToAnchor,
  showNCloseModal,
  closeModal,
  serverNotification,
  requestMessage,
  showNKeepModal,
} from "@/axios-functions";

export default defineComponent({
  name: "LoanView",
  components: {
    UpdateModal,
    InsertModal,
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
    };
  },
  methods: {
    // go to id div
    scrollToAnchor(element: string): void {
      return scrollToAnchor(element);
    },
    // get datable from database
    getDataFromApi(): void {
      // call axios get callback
      axios
        .get(this.baseURL)
        .then((response) => {
          if (response.data != null) {
            this.loans = response.data;
            // open success notification
            serverNotification("success");
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
    // show insert modal
    showInsertModal(): void {
      // display update modal
      return showNCloseModal("insert-div", "update-div");
    },
    // close update modal
    close(element: string): void {
      return closeModal(element);
    },
    // pass data from parent comp to child comp
    passDatatoUpdatePage(model: null): void {
      // parsing data into Json format
      this.output = JSON.parse(JSON.stringify(model));

      // display update modal
      return showNKeepModal("update-div", "insert-div");
    },
    // delete data from datatable with id
    deleteData(model: undefined): void {
      // parsing data into Json format
      this.output = JSON.parse(JSON.stringify(model));

      // open delete confirmation modal
      ElMessageBox.confirm(
        "This row data will be deleted. Continue?",
        "Warning",
        {
          distinguishCancelAndClose: true,
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          draggable: true,
        }
      )
        .then(() => {
          // call axios delete callback
          axios
            .delete(this.baseURL + this.output.loanID)
            .then(() => {
              // open success message
              requestMessage("success", "Delete", "confirm");
              this.getDataFromApi();
            })
            .catch((error) => {
              // open error message
              requestMessage("error", "Delete", "confirm");
              console.log(error);
            });
        })
        .catch((action: Action) => {
          requestMessage("info", "Delete", action);
        });
    },
  },
  created() {
    this.getDataFromApi();
  },
});
</script>

<style src="@/assets/css/table-style.css"></style>
