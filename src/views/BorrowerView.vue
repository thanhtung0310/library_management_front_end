<template>
  <div class="borrowers">
    <h1>{{ $t("message.view_header", { table: "BORROWER" }) }}</h1>
    <div class="insert-div" id="insert-div">
      <button
        id="btnInsertPage"
        @click="goToInsertPage(), (showModal = !showModal)"
      >
        {{ $t("message.create_message", { table: "borrower" }) }}
      </button>
      <router-view 
        :show="showModal" 
        :baseURL="baseURL"
        @close="showModal = false"
      ></router-view>
    </div>

    <div class="update-div" id="update-div" style="display: none">
      <Update
        :borrowerID="output.borrowerID"
        :borrowerName="output.borrowerName"
        :borrowerAddr="output.borrowerAddr"
        :borrowerNo="output.borrowerNum"
        :baseURL="baseURL"
      ></Update>
    </div>

    <div class="table-view">
      <table class="table">
        <thead>
          <tr>
            <th>{{ $t("borrowers.borrower_id") }}</th>
            <th>{{ $t("borrowers.borrower_name") }}</th>
            <th>{{ $t("borrowers.borrower_address") }}</th>
            <th>{{ $t("borrowers.borrower_number") }}</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in borrowers" :key="index">
            <td>{{ row.borrowerID }}</td>
            <td>{{ row.borrowerName }}</td>
            <td>{{ row.borrowerAddr }}</td>
            <td>{{ row.borrowerNum }}</td>
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
import Update from "@/pages/Borrowers/BorrowerUpdate.vue";

export default defineComponent({
  name: "BorrowerView",
  components: {
    Update,
  },
  data() {
    return {
      baseURL: "https://localhost:7123/api/borrowers/",
      borrowers: null,
      output: {
        borrowerID: Number,
        borrowerName: String,
        borrowerAddr: String,
        borrowerNum: String,
      },
      showModal: false,
    };
  },
  methods: {
    // call to insert page
    goToInsertPage() {
      this.$router.push("/borrowers/insert");
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
          if (response.data != null) this.borrowers = response.data;
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
      // parse dữ liệu sang dạng JSON
      this.output = JSON.parse(JSON.stringify(model));

      // call axios delete call back
      axios
        .delete(this.baseURL + this.output.borrowerID)
        .then(() => {
          alert("Success delete borrower with id = " + this.output.borrowerID);
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