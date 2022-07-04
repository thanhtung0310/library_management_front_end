<template>
  <div class="borrowers">
    <h1>BORROWER LIST</h1>
    <div class="insert-div" id="insert-div">
      <button
        id="btnInsertPage"
        @click="goToInsertPage(), (showModal = !showModal)"
      >
        Create new borrower
      </button>
      <router-view :show="showModal" @close="showModal = false"></router-view>
    </div>

    <div class="update-div" id="update-div">
      <Update
        :borrowerID="output.borrower_CardNo"
        :borrowerName="output.borrower_BorrowerName"
        :borrowerAddr="output.borrower_BorrowerAddress"
        :borrowerNo="output.borrower_BorrowerPhone"
      ></Update>
    </div>

    <div class="table-view">
      <table class="table">
        <thead>
          <tr>
            <th>Borrower ID</th>
            <th>Borrower name</th>
            <th>Borrower address</th>
            <th>Borrower contact number</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in data" :key="index">
            <td>{{ row.borrower_CardNo }}</td>
            <td>{{ row.borrower_BorrowerName }}</td>
            <td>{{ row.borrower_BorrowerAddress }}</td>
            <td>{{ row.borrower_BorrowerPhone }}</td>
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
import Update from "@/pages/Borrowers/BorrowerUpdate.vue";

export default defineComponent({
  name: "BorrowerView",
  components: {
    Update,
  },
  data() {
    return {
      baseURL: "https://localhost:7123/api/borrowers/",
      data: null,
      output: {
        borrower_CardNo: Number,
        borrower_BorrowerName: String,
        borrower_BorrowerAddress: String,
        borrower_BorrowerPhone: String,
      },
      showModal: false,
    };
  },
  methods: {
    goToInsertPage() {
      this.$router.push("/borrower_insert");
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
        .delete(this.baseURL + this.output.borrower_CardNo)
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