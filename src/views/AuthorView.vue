<template>
  <div class="authors">
    <h1>{{ $t("message.view_header", { table: "AUTHOR" }) }}</h1>
    <div class="insert-div" id="insert-div">
      <button
        id="btnInsertPage"
        @click="goToInsertPage(), (showModal = !showModal)"
      >
        {{ $t("message.create_message", { table: "author" }) }}
      </button>
      <router-view 
        :show="showModal"
        :baseURL = "baseURL"
        @close="showModal = false"
      ></router-view>
    </div>

    <div class="update-div" id="update-div" style="display: none">
      <Update
        :authorID="output.authorID"
        :bookID="output.author_BookID"
        :authorName="output.authorName"
        :baseURL="baseURL"
      ></Update>
    </div>

    <div class="table-view">
      <table class="table">
        <thead>
          <tr>
            <th>{{ $t("authors.author_id") }}</th>
            <th>{{ $t("authors.book_id") }}</th>
            <th>{{ $t("authors.author_name") }}</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in authors" :key="index">
            <td>{{ row.authorID }}</td>
            <td>{{ row.author_BookID }}</td>
            <td>{{ row.authorName }}</td>
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
import Update from "@/pages/Authors/AuthorUpdate.vue";

export default defineComponent({
  name: "AuthorView",
  components: {
    Update,
  },
  data() {
    return {
      baseURL: "https://localhost:7123/api/authors/",
      authors: null,
      output: {
        authorID: Number,
        author_BookID: Number,
        authorName: String,
      },
      showModal: false,
    };
  },
  methods: {
    // call to insert page
    goToInsertPage() {
      this.$router.push("/authors/insert");
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
          if (response.data != null) this.authors = response.data;
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
    // delete data from datatable with id
    deleteData(model: undefined): void {
      // parsing data into Json format
      this.output = JSON.parse(JSON.stringify(model));

      // call axios delete callback
      axios
        .delete(this.baseURL + this.output.authorID)
        .then(() => {
          alert("Success delete author with id = " + this.output.authorID);
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