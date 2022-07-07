<template>
  <div class="authors">
    <h1>{{ $t("authors.view_header") }}</h1>
    <div class="insert-div" id="insert-div">
      <button
        id="btnInsertPage"
        @click="goToInsertPage(), (showModal = !showModal)"
      >
        {{ $t("authors.create_btn") }}
      </button>
      <router-view :show="showModal" @close="showModal = false"></router-view>
    </div>

    <div class="update-div" id="update-div">
      <Update
        :authorID="output.book_authors_AuthorID"
        :bookID="output.book_authors_BookID"
        :authorName="output.book_authors_AuthorName"
      ></Update>
    </div>

    <div class="table-view">
      <table class="table">
        <thead>
          <tr>
            <th>{{ $t("authors.author_id") }}</th>
            <th>{{ $t("authors.book_id") }}</th>
            <th>{{ $t("authors.author_name") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in data" :key="index">
            <td>{{ row.book_authors_AuthorID }}</td>
            <td>{{ row.book_authors_BookID }}</td>
            <td>{{ row.book_authors_AuthorName }}</td>
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
import Update from "@/pages/Authors/AuthorUpdate.vue";

export default defineComponent({
  name: "AuthorView",
  components: {
    Update,
  },
  data() {
    return {
      baseURL: "https://localhost:7123/api/authors/",
      data: null,
      output: {
        book_authors_AuthorID: Number,
        book_authors_BookID: Number,
        book_authors_AuthorName: String,
      },
      showModal: false,
    };
  },
  methods: {
    goToInsertPage() {
      this.$router.push("/author_insert");
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
        .delete(this.baseURL + this.output.book_authors_AuthorID)
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