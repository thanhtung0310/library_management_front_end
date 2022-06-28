<template>
  <div class="borrowers">
    <h1>BORROWER LIST</h1>

    <table class="table">
      <thead>
        <tr>
          <th>Customer ID</th>
          <th>Customer name</th>
          <th>Customer address</th>
          <th>Customer contact number</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in data" :key="index">
          <td v-text="row.borrower_CardNo"></td>
          <td v-text="row.borrower_BorrowerName"></td>
          <td v-text="row.borrower_BorrowerAddress"></td>
          <td v-text="row.borrower_BorrowerPhone"></td>
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
  name: "BorrowerView",
  component: {},
  data() {
    return {
      data: null,
      URL: "https://localhost:7123/api/borrowers/",
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