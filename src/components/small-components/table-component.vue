<template>
  <el-table
    :data="books"
    :default-sort="{ prop: 'bookID', order: 'descending' }"
    style="width: 80%"
  >
    <el-table-column fixed prop="books.bookID" sortable>
      <template #header>
        {{ $t("books.book_id") }}
      </template>
      <template #default="scope">
        {{ scope.row.bookID }}
      </template>
    </el-table-column>

    <el-table-column prop="bookTitle">
      <template #header>
        {{ $t("books.book_title") }}
      </template>
    </el-table-column>

    <el-table-column prop="book_PublisherID">
      <template #header>
        {{ $t("books.publisher_id") }}
      </template>
    </el-table-column>

    <el-table-column fixed="right">
      <template #header> Functions </template>
      <template #default="scope">
        <el-button
          @click="
            passDataToUpdatePage(scope.$index, scope.row),
              scrollToAnchor('update-div')
          "
          ><font-awesome-icon class="icon" icon="fa-solid fa-circle-info"
        /></el-button>
        <el-button @click="deleteData(scope.$index, scope.row)"
          ><font-awesome-icon class="icon" icon="fa-solid fa-ban"
        /></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import { ElMessageBox } from "element-plus";
import type { Action } from "element-plus";
import {
  scrollToAnchor,
  showNCloseModal,
  closeModal,
  serverNotification,
  requestMessage,
  showNKeepModal,
} from "@/axios-functions";

interface IBook {
  bookID: number;
  bookTitle: string;
  book_PublisherID: number;
}

export default defineComponent({
  name: "BookView",
  data() {
    return {
      baseURL: "https://localhost:7123/api/books/",
      books: undefined,
      output: {
        bookID: ref(0),
        bookTitle: ref(""),
        book_PublisherID: ref(0),
      },
      trigger: true,
    };
  },
  // computed: {
  //   filterTableData(): void {
  //     return this.books.filter();
  //   },
  // },
  methods: {
    // go to id div
    scrollToAnchor(element: string): void {
      return scrollToAnchor(element);
    },
    // get datatable from database
    getDataFromApi(): void {
      // call axios get callback
      axios
        .get(this.baseURL)
        .then((response) => {
          if (!response) {
            // open warning notification
            serverNotification("warning");
            return;
          }
          this.books = response.data;
          // open success notification
          serverNotification("success");
        })
        .catch((error) => {
          // open error notification
          serverNotification("error");
          console.log(error);
        });
    },
    // show insert modal
    showInsertModal(): void {
      // display update modal
      return showNCloseModal("insert-div", "update-div");
    },
    // close update modal
    close(element: string): void {
      return closeModal(element);
    },
    // pass data from parent comp to child comp
    passDataToUpdatePage(index: number, row: IBook): void {
      // parsing data into Json format
      this.output = JSON.parse(JSON.stringify(row));
      this.trigger = !this.trigger;

      // display update modal
      return showNKeepModal("update-div", "insert-div");
    },
    // delete data from datable with id
    deleteData(index: number, row: IBook): void {
      // parsing data into Json format
      this.output = JSON.parse(JSON.stringify(row));

      // open delete confirmation modal
      ElMessageBox.confirm(
        "This row data will be deleted. Continue?",
        "Warning",
        {
          distinguishCancelAndClose: true,
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          draggable: true,
        }
      )
        .then(() => {
          // call axios delete callback
          axios
            .delete(this.baseURL + this.output.bookID)
            .then(() => {
              // open success message
              requestMessage("success", "Delete", "confirm");
              this.getDataFromApi();
            })
            .catch((error) => {
              // open error message
              requestMessage("error", "Delete", "confirm");
              console.log(error);
            });
        })
        .catch((action: Action) => {
          requestMessage("info", "Delete", action);
        });
    },
  },
  created() {
    this.getDataFromApi();
  },
});
</script>
