<template>
  <div class="books">
    <h1>{{ $t("message.view_header", { table: "BOOK" }) }}</h1>

    <el-button @click="showInsertModal()" round>
      {{ $t("message.create_message", { table: "book" }) }}
    </el-button>

    <div class="insert-div" id="insert-div" style="display: none">
      <InsertModal
        :baseURL="baseURL"
        @refresh="getDataFromApi"
        @close="close('insert-div')"
      ></InsertModal>
    </div>

    <div class="update-div" id="update-div" style="display: none">
      <UpdateModal
        :bookID="output.bookID"
        :bookTitle="output.bookTitle"
        :publisherID="output.book_PublisherID"
        :baseURL="baseURL"
        :runMethod="trigger"
        @refresh="getDataFromApi"
        @close="close('update-div')"
      ></UpdateModal>
    </div>

    <div class="table-view">
      <el-table
        :data="books"
        :default-sort="{ prop: 'bookID', order: 'ascending' }"
        style="width: 80%"
        max-height="350"
      >
        <el-table-column fixed prop="bookID" sortable>
          <template #header>
            {{ $t("books.book_id") }}
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
            <el-button @click="deleteData(scope.$index, scope.row)">
              <font-awesome-icon class="icon" icon="fa-solid fa-trash-can" />
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <el-pagination layout="prev, pager, next" :total="totalRow" /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import { ElMessageBox } from "element-plus";
import type { Action } from "element-plus";
import UpdateModal from "@/pages/Books/BookUpdate.vue";
import InsertModal from "@/pages/Books/BookInsert.vue";
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

// class Book implements IBook {
//   bookID: number;
//   bookTitle: string;
//   book_PublisherID: number;
// }

export default defineComponent({
  name: "BookView",
  components: {
    UpdateModal,
    InsertModal,
  },
  data() {
    return {
      baseURL: "https://localhost:7123/api/books/",
      books: [],
      output: {
        bookID: ref(0),
        bookTitle: ref(""),
        book_PublisherID: ref(0),
      },
      trigger: true,
      outerDialogVisible: ref(false),
      innerDialogVisible: ref(false),
      // queryInfo: {
      //   query: "",
      //   pageNum: 1,
      //   pageSize: 5,
      // },
      // totalRow: 0,
      // search: ref(""),
    };
  },
  // watch: {
  //   search(): void {
  //     // this.books.filter((data: string) => {
  //     //   !this.search || data.toLowerCase().includes(this.search.toLowerCase());
  //     // });
  //     console.log(this.search.toLowerCase());
  //     // this.books.filter((book: IBook) => {
  //     //   this.book.bookTitle.includes(this.search.toLowerCase());
  //     // });
  //   },
  // },
  // setup(search) {
  //   this.books.filter(
  //     (data) =>
  //       !search.value ||
  //       data.name.toLowerCase().includes(search.value.toLowerCase())
  //   );
  // },
  methods: {
    // go to id div
    scrollToAnchor(element: string): void {
      return scrollToAnchor(element);
    },
    // // Listen for page size change events
    // handleSizeChange (newSize) {
    //   this.queryInfo.pagesize = newSize
    //   this.getUserList()
    // },
    // // Listen for events when the page number value changes
    // handleCurrentChange (newPage) {
    //   this.queryInfo.pagenum = newPage
    //   this.getUserList()
    // },
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
          // this.totalRow = response.data.length;
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
  // setup() {
  //   const books: IBook[];
  //   const getRowData = (row: IBook, col: TableColumnCtx<IBook>) => {
  //     console.log(row, col);
  //   };
  // },
  created() {
    this.getDataFromApi();
  },
});
</script>

<style src="@/assets/css/table-style.css"></style>
