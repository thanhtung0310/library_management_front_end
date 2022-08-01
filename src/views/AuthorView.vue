<template>
  <div class="authors">
    <h1>{{ $t("message.view_header", { table: "AUTHOR" }) }}</h1>

    <el-button @click="showInsertModal()" round>
      {{ $t("message.create_message", { table: "author" }) }}
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
        :authorID="output.authorID"
        :bookID="output.author_BookID"
        :authorName="output.authorName"
        :baseURL="baseURL"
        :runMethod="trigger"
        @refresh="getDataFromApi"
        @close="close('update-div')"
      ></UpdateModal>
    </div>

    <div class="table-view">
      <el-table
        :data="authors"
        :default-sort="{ prop: 'authorID', order: 'ascending' }"
        style="width: 80%"
        max-height="350"
      >
        <el-table-column fixed prop="authorID" sortable>
          <template #header>
            {{ $t("authors.author_id") }}
          </template>
        </el-table-column>

        <el-table-column prop="author_BookID">
          <template #header>
            {{ $t("authors.book_id") }}
          </template>
        </el-table-column>

        <el-table-column prop="authorName" sortable>
          <template #header>
            {{ $t("authors.author_name") }}
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import { ElMessageBox } from "element-plus";
import type { Action } from "element-plus";
import UpdateModal from "@/pages/Authors/AuthorUpdate.vue";
import InsertModal from "@/pages/Authors/AuthorInsert.vue";
import {
  scrollToAnchor,
  showNCloseModal,
  closeModal,
  serverNotification,
  requestMessage,
  showNKeepModal,
} from "@/axios-functions";

interface IAuthor {
  authorID: number;
  author_BookID: number;
  authorName: string;
}

export default defineComponent({
  name: "AuthorView",
  components: {
    UpdateModal,
    InsertModal,
  },
  data() {
    return {
      baseURL: "https://localhost:7123/api/authors/",
      authors: [],
      output: {
        authorID: ref(0),
        author_BookID: ref(0),
        authorName: ref(""),
      },
      trigger: true,
    };
  },
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
          this.authors = response.data;
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
    passDataToUpdatePage(index: number, row: IAuthor): void {
      // parsing data into Json format
      this.output = JSON.parse(JSON.stringify(row));
      this.trigger = !this.trigger;

      // display update modal
      return showNKeepModal("update-div", "insert-div");
    },
    // delete data from datatable with id
    deleteData(index: number, row: IAuthor): void {
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
            .delete(this.baseURL + this.output.authorID)
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

<style src="@/assets/css/table-style.css"></style>
