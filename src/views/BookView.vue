<template>
  <div class="books">
    <h1>{{ $t("message.view_header", { table: "BOOK" }) }}</h1>
    <div class="insert-div" id="insert-div">
      <button
        id="btnInsertPage"
        @click="goToInsertPage(), (showModal = !showModal)"
      >
        {{ $t("message.create_message", { table: "book" }) }}
      </button>
      <router-view :show="showModal" @close="showModal = false"></router-view>
    </div>

    <div class="update-div" id="update-div" style="display: none">
      <Update
        :bookID="output.bookID"
        :bookTitle="output.bookTitle"
        :publisherID="output.book_PublisherID"
      ></Update>
    </div>
    <div class="table-view">
      <table class="table">
        <thead>
          <tr>
            <th>{{ $t("books.book_id") }}</th>
            <th>{{ $t("books.book_title") }}</th>
            <th>{{ $t("books.publisher_id") }}</th>
            <!-- <th>{{ $t("authors.author_name") }}</th>
            <th>{{ $t("publishers.publisher_name") }}</th> -->
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in books" :key="index">
            <td>{{ row.bookID }}</td>
            <td>{{ row.bookTitle }}</td>
            <td>{{ row.book_PublisherID }}</td>
            <!-- <td>{{ row.author_name }}</td>
            <td>{{ row.publisher_name }}</td> -->
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
import Update from "@/pages/Books/BookUpdate.vue";

export default defineComponent({
  name: "BookView",
  components: {
    Update,
  },
  data() {
    return {
      baseURL: "https://localhost:7123/api/books/",
      // baseURL2: "https://localhost:7123/Get/book_list",
      books: null,
      output: {
        bookID: Number,
        bookTitle: String,
        book_PublisherID: Number,
      },
      showModal: false,
    };
  },
  methods: {
    // call to insert page
    goToInsertPage() {
      this.$router.push("/books/insert");
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
          if (response.data != null) this.books = response.data;
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
    // delete data from datable with id
    deleteData(model: undefined): void {
      // parsing data into Json format
      this.output = JSON.parse(JSON.stringify(model));

      // call axios delete callback
      axios
        .delete(this.baseURL + this.output.bookID)
        .then(() => {
          alert("Success delete book with id = " + this.output.bookID);
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

<style src="@/assets/css/table-style.css" scoped></style>