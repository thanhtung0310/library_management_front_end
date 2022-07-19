<template>
  <el-table :data="tableData">
      <el-table-column fixed prop="date" label="Date" width="auto" />
      <el-table-column prop="name" label="Name" width="auto" />
      <el-table-column prop="state" label="State" width="auto" />
      <el-table-column prop="city" label="City" width="auto" />
      <el-table-column prop="address" label="Address" width="auto" />
      <el-table-column prop="zip" label="Zip" width="auto" />
      <el-table-column fixed="right" label="Details" width="auto">
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick"
            >Detail</el-button
          >
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Delete" width="auto">
        <template #default>
          <el-button link type="primary" size="small" @click="openDeleteModal"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  ElMessage,
  ElMessageBox,
} from "element-plus";
import type { Action } from "element-plus";

export default defineComponent({
  name: "eltable-template",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
          tag: "Home",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
          tag: "Office",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
          tag: "Home",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
          tag: "Office",
        },
      ],
    };
  },
  methods: {
    handleClick() {
      console.log("click");
    },
    // open delete confirmation modal
    openDeleteModal() {
      ElMessageBox.confirm(
        "This row data will be deleted. Continue?",
        "Warning",
        {
          distinguishCancelAndClose: true,
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
          draggable: true,
        }
      )
        .then(() => {
          ElMessage({
            type: "success",
            message: "Delete process completed!",
          });
        })
        .catch((action: Action) => {
          ElMessage({
            type: "info",
            message:
              action === "cancel"
                ? "Delete process cancelled!"
                : "Nothing happen :3",
          });
        });
    },
  },
});
</script>