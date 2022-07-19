<template>
  <div class="publishers">
    <h1>{{ $t("message.view_header", { table: "PUBLISHER" }) }}</h1>
    <div class="insert-div" id="insert-div">
      <button
        id="btnInsertPage"
        @click="goToInsertPage(), (showModal = !showModal)"
      >
        {{ $t("message.create_message", { table: "publisher" }) }}
      </button>
      <router-view 
        :show="showModal" 
        :baseURL="baseURL"
        @close="showModal = false"
      ></router-view>
    </div>

    <div class="update-div" id="update-div" style="display: none">
      <Update
        :publisherID="output.publisherID"
        :publisherName="output.publisherName"
        :publisherAddr="output.publisherAddr"
        :publisherNo="output.publisherNum"
        :baseURL="baseURL"
      ></Update>
    </div>
    
    <table class="table">
      <thead>
        <tr>
          <th>{{ $t("publishers.publisher_id") }}</th>
          <th>{{ $t("publishers.publisher_name") }}</th>
          <th>{{ $t("publishers.publisher_address") }}</th>
          <th>{{ $t("publishers.publisher_number") }}</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in publishers" :key="index">
          <td>{{ row.publisherID }}</td>
          <td>{{ row.publisherName }}</td>
          <td>{{ row.publisherAddr }}</td>
          <td>{{ row.publisherNum }}</td>
          <td @click="passDatatoUpdatePage(row), scrollToAnchor('update-div')">
            <font-awesome-icon class="icon" icon="fa-solid fa-circle-info" />
          </td>
          <td @click="deleteData(row)">
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
import Update from "@/pages/Publishers/PublisherUpdate.vue";

export default defineComponent({
  name: "PublisherView",
  components: {
    Update,
  },
  data() {
    return {
      baseURL: "https://localhost:7123/api/publishers/",
      publishers: null,
      output: {
        publisherID: Number,
        publisherName: String,
        publisherAddr: String,
        publisherNum: String,
      },
      showModal: false,
    };
  },
  methods: {
    // call to insert page
    goToInsertPage() {
      this.$router.push("/publishers/insert");
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
          if (response.data != null) this.publishers = response.data;
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
        .delete(this.baseURL + this.output.publisherID)
        .then(() => {
          alert(
            "Success delete publisher with id = " + this.output.publisherID
          );
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