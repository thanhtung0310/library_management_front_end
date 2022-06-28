<template>
  <div class="books">
    <h1>BOOK LIST</h1>
    <div class="insert-div" id="insert-div">
      <button
        id="btnInsertPage"
        @click="goToInsertPage(), (showModal = !showModal)"
      >
        Create new book
      </button>
      <router-view :show="showModal" @close="showModal = false"></router-view>
    </div>

    <div class="update-div" id="update-div">
      <Update
        :data="output"
        :book_BookID="output.book_BookID"
        :book_Title="output.book_Title"
        :book_PublisherID="output.book_PublisherID"
      ></Update>
    </div>

    <div class="table-view">
      <table class="table">
        <thead>
          <tr>
            <th>Book ID</th>
            <th>Book title</th>
            <th>Book's publisher</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in data" :key="index">
            <td>{{ row.book_BookID }}</td>
            <td>{{ row.book_Title }}</td>
            <td>{{ row.book_PublisherID }}</td>
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
import Update from "@/pages/Books/BookUpdate.vue";

export default defineComponent({
  name: "BookView",
  components: {
    Update,
  },
  data() {
    return {
      baseURL: "https://localhost:7123/api/books/",
      data: null,
      output: {
        book_BookID: Number,
        book_Title: String,
        book_PublisherID: Number,
      },
      showModal: false,
    };
  },
  methods: {
    goToInsertPage() {
      this.$router.push("/book_insert");
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
      debugger;
      let updateDiv = document.getElementById("#update-div");
      //updateDiv = "block";
      if (updateDiv?.style.display == "none") {
        updateDiv.style.display = "block";
      } else {
        updateDiv?.style.display == "none";
      }
    },
    passDatatoDeletePage(model: undefined): void {
      // parse dữ liệu sang dạng JSON
      const modelParse = JSON.parse(JSON.stringify(model));
      this.output = modelParse;

      // gọi API delete
      axios
        .delete(this.baseURL + this.output.book_BookID)
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

<style src="@/assets/css/table-style.css" scoped></style>