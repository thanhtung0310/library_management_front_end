<template>
  <div class="publishers">
    <h1>PUBLISHER LIST</h1>

    <table class="table">
      <thead>
        <tr>
          <th>Publisher ID</th>
          <th>Publisher name</th>
          <th>Publisher address</th>
          <th>Publisher contact number</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in data" :key="index">
          <td v-text="row.publisher_PublisherID"></td>
          <td v-text="row.publisher_PublisherName"></td>
          <td v-text="row.publisher_PublisherAddress"></td>
          <td v-text="row.publisher_PublisherPhone"></td>
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
  name: "PublisherView",
  component: {},
  data() {
    return {
      data: null,
      URL: "https://localhost:7123/api/publishers/",
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