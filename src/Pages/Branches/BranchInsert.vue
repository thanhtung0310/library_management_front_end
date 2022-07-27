<template>
  <div class="insert-box">
    <el-form :model="input">
      <div class="box-header">
        <p>{{ $t("message.create_message", { table: "branch" }) }}</p>
      </div>

      <el-form-item>
        <label>{{ $t("branches.branch_name") }}: </label>
        <el-input
          v-model="input.branchName"
          type="text"
          placeholder="Please enter branch name..."
        />
      </el-form-item>
      <el-form-item>
        <label>{{ $t("branches.branch_address") }}: </label>
        <el-input
          v-model="input.branchAddr"
          type="textarea"
          placeholder="Please enter branch address..."
        />
      </el-form-item>
      <el-form-item class="button-group">
        <el-button type="success" @click="createData()" round>
          {{ $t("message.create_header") }}
        </el-button>
        <el-button type="info" @click="clearData()" round>{{
          $t("message.reset_message")
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "branch_insert",
  data() {
    return {
      // baseURL: "https://localhost:7123/api/branches/",
      input: {
        branchName: null,
        branchAddr: null,
      },
    };
  },
  props: {
    baseURL: {
      type: String,
      default: "",
    },
  },
  methods: {
    // create new branch in database
    createData(): void {
      // call axios post callback
      axios
        .post(this.baseURL, this.input)
        .then(() => {
          // open success notification
          ElMessage({
            type: "success",
            message: "Insert process completed!",
          });
          this.clearData();
          this.$emit("refresh");
          this.$emit("close");
        })
        .catch((error) => {
          // open error notification
          ElMessage({
            type: "error",
            message: "Insert process failed! Please try again.",
          });
          console.log(error);
        });
    },
    // clear input data
    clearData(): void {
      this.input.branchName = null;
      this.input.branchAddr = null;
    },
  },
});
</script>

<style src="@/assets/css/insert-style.css"></style>
