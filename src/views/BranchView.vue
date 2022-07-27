<template>
  <div class="branches">
    <h1>{{ $t("message.view_header", { table: "BRANCH" }) }}</h1>

    <el-button @click="showInsertModal()" round>
      {{ $t("message.create_message", { table: "branch" }) }}
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
        :branchID="output.branchID"
        :branchName="output.branchName"
        :branchAddr="output.branchAddr"
        :baseURL="baseURL"
        @refresh="getDataFromApi"
        @close="close('update-div')"
      ></UpdateModal>
    </div>

    <div class="table-view">
      <table class="table">
        <thead>
          <tr>
            <th>{{ $t("branches.branch_id") }}</th>
            <th>{{ $t("branches.branch_name") }}</th>
            <th>{{ $t("branches.branch_address") }}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in branches" :key="index">
            <td>{{ row.branchID }}</td>
            <td>{{ row.branchName }}</td>
            <td>{{ row.branchAddr }}</td>
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
import UpdateModal from "@/pages/Branches/BranchUpdate.vue";
import InsertModal from "@/pages/Branches/BranchInsert.vue";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
import type { Action } from "element-plus";

export default defineComponent({
  name: "BranchView",
  components: {
    UpdateModal,
    InsertModal,
  },
  data() {
    return {
      baseURL: "https://localhost:7123/api/branches/",
      branches: null,
      output: {
        branchID: Number,
        branchName: Number,
        branchAddr: String,
      },
    };
  },
  methods: {
    // go to id div
    scrollToAnchor(element: string): void {
      location.hash = "#" + element;
    },
    // get datatable from database
    getDataFromApi(): void {
      // call axios get callback
      axios
        .get(this.baseURL)
        .then((response) => {
          if (response.data != null) {
            this.branches = response.data;
            // open success notification
            ElNotification({
              title: "Success",
              message: "Data refresh!",
              type: "success",
            });
          } else {
            // open warning notification
            ElNotification({
              title: "Warning",
              message: "No data is loaded into table!",
              type: "warning",
            });
          }
        })
        .catch((error) => {
          // open error notification
          ElNotification({
            title: "Error",
            message: "Cannot connect to server...",
            type: "error",
          });
          console.log(error);
        });
    },
    // show insert modal
    showInsertModal(): void {
      // display update modal
      const insertDiv = document.getElementById("insert-div");
      const updateDiv = document.getElementById("update-div");
      if (insertDiv != null && updateDiv != null) {
        if (
          insertDiv.style.display == "none" ||
          updateDiv.style.display == "block"
        ) {
          insertDiv.style.display = "block";
          updateDiv.style.display = "none";
        } else if (insertDiv.style.display == "block")
          insertDiv.style.display = "none";
      }
    },
    // close update modal
    close(element: string): void {
      const div = document.getElementById(element);
      if (div != null) {
        div.style.display = "none";
      }
    },
    // pass data from parent component to child component
    passDatatoUpdatePage(model: undefined): void {
      // parsing data into Json format
      this.output = JSON.parse(JSON.stringify(model));

      // display update modal
      const updateDiv = document.getElementById("update-div");
      const insertDiv = document.getElementById("insert-div");
      if (updateDiv != null && insertDiv != null) {
        if (
          updateDiv.style.display == "none" ||
          insertDiv.style.display == "block"
        ) {
          updateDiv.style.display = "block";
          insertDiv.style.display = "none";
        } else if (updateDiv.style.display == "block")
          updateDiv.style.display = "block";
        else updateDiv.style.display = "none";
      }
    },

    // delete data from datable with id
    deleteData(model: null): void {
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
            .delete(this.baseURL + this.output.branchID)
            .then(() => {
              // open success message
              ElMessage({
                type: "success",
                message: "Delete process completed!",
              });
              this.getDataFromApi();
            })
            .catch((error) => {
              // open error message
              ElMessage({
                type: "error",
                message: "Delete process failed!",
              });
              console.log(error);
            });
        })
        .catch((action: Action) => {
          ElMessage({
            type: "info",
            message:
              action === "cancel"
                ? "Delete process cancelled!"
                : "Nothing happen :3",
          });
        });
    },
  },
  created() {
    this.getDataFromApi();
  },
});
</script>

<style src="@/assets/css/table-style.css"></style>
