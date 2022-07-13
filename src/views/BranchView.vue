<template>
  <div class="branches">
    <h1>{{ $t("message.view_header", { table: "BRANCH" }) }}</h1>
    <div class="insert-div" id="insert-div">
      <button
        id="btnInsertPage"
        @click="goToInsertPage(), (showModal = !showModal)"
      >
        {{ $t("message.create_message", { table: "branch" }) }}
      </button>
      <router-view :show="showModal" @close="showModal = false"></router-view>
    </div>

    <div class="update-div" id="update-div" style="display: none">
      <Update
        :branchID="output.branchID"
        :branchName="output.branchName"
        :branchAddr="output.branchAddr"
      ></Update>
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
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import Update from "@/pages/Branches/BranchUpdate.vue";

export default defineComponent({
  name: "BranchView",
  components: {
    Update,
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
      showModal: false,
    };
  },
  methods: {
    // call to insert page
    goToInsertPage() {
      this.$router.push("/branches/insert");
    },
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
          if (response.data != null) this.branches = response.data;
          else alert("No data is loaded into table!");
        })
        .catch((error) => {
          alert("Cannot connect to server...");
          console.log(error);
        });
    },
    // pass data from parent component to child component
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
  },
  created() {
    this.getDataFromApi();
  },
});
</script>

<style src="@/assets/css/table-style.css"></style>