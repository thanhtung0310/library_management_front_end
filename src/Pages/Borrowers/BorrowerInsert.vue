<template>
  <div class="insert-box">
    <el-form :modal="input">
      <div class="box-header">
        <p>{{ $t("message.create_message", { table: "borrower" }) }}</p>
      </div>

      <el-form-item>
        <label>{{ $t("borrowers.borrower_name") }}: </label>
        <el-input
          v-model="input.borrowerName"
          type="text"
          placeholder="Please enter borrower name..."
        />
      </el-form-item>
      <el-form-item>
        <label>{{ $t("borrowers.borrower_address") }}: </label>
        <el-input
          v-model="input.borrowerAddr"
          type="textarea"
          placeholder="Please enter borrower address..."
        />
      </el-form-item>
      <el-form-item>
        <label>{{ $t("borrowers.borrower_number") }}: </label>
        <el-input
          v-model="input.borrowerNum"
          type="text"
          placeholder="Please enter borrower contact number..."
        />
      </el-form-item>
      <el-form-item class="button-group">
        <el-button type="submit" @click="createData()" round>
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
  name: "borrower_insert",
  data() {
    return {
      input: {
        borrowerName: null,
        borrowerAddr: null,
        borrowerNum: null,
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
    // create new borrower in database
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
      this.input.borrowerName = null;
      this.input.borrowerAddr = null;
      this.input.borrowerNum = null;
    },
  },
});
</script>

<style src="@/assets/css/insert-style.css"></style>
