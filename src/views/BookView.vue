<template>
  <div class="books">
    <h1>{{ $t("books.view_header") }}</h1>
    <div class="insert-div" id="insert-div">
      <button
        id="btnInsertPage"
        @click="goToInsertPage(), (showModal = !showModal)"
      >
        {{ $t("books.create_btn") }}
      </button>
      <router-view :show="showModal" @close="showModal = false"></router-view>
    </div>

    <div class="update-div" id="update-div">
      <Update
        :bookID="output.book_BookID"
        :bookTitle="output.book_Title"
        :publisherID="output.book_PublisherID"
      ></Update>
    </div>

    <div class="table-view">
      <table class="table">
        <thead>
          <tr>
            <th>{{ $t("books.book_id") }}</th>
            <th>{{ $t("books.book_title") }}</th>
            <th>{{ $t("authors.author_name") }}</th>
            <th>{{ $t("publishers.publisher_name") }}</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in data" :key="index">
            <td>{{ row.book_id }}</td>
            <td>{{ row.book_title }}</td>
            <td>{{ row.author_name }}</td>
            <td>{{ row.publisher_name }}</td>
            <td @click="passDatatoUpdatePage(row)">
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
import Update from "@/pages/Books/BookUpdate.vue";

export default defineComponent({
  name: "BookView",
  components: {
    Update,
  },
  data() {
    return {
      // baseURL: "https://localhost:7123/api/books/",
      baseURL: "https://localhost:7123/Get/book_list",
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
      this.$router.push("/books/insert");
    },
    getDataFromApi(): void {
      axios
        .get(this.baseURL)
        .then((response) => {
          this.data = response.data.data;
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
    deleteData(model: undefined): void {
      // parse dữ liệu sang dạng JSON
      const modelParse = JSON.parse(JSON.stringify(model));
      this.output = modelParse;

      // gọi API delete
      axios
        .delete(this.baseURL + this.output.book_BookID)
        .then((response) => {
          this.data = response.data;
          alert("Success delete book with id = " + this.output.book_BookID);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getDataFromApi();
  },
});
</script>

<style src="@/assets/css/table-style.css" scoped></style>