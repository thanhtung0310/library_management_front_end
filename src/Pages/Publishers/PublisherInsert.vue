<template>
  <div class="insert-box">
    <el-form :model="input">
      <div class="box-header">
        <p>{{ $t("message.create_message", { table: "publisher" }) }}</p>
      </div>

      <el-form-item>
        <label>{{ $t("publishers.publisher_name") }}: </label>
        <el-input
          v-model="input.publisherName"
          type="text"
          placeholder="Please enter publisher name..."
        />
      </el-form-item>
      <el-form-item>
        <label>{{ $t("publishers.publisher_address") }}: </label>
        <el-input
          v-model="input.publisherAddr"
          type="textarea"
          placeholder="Please enter publisher address..."
        />
      </el-form-item>
      <el-form-item>
        <label>{{ $t("publishers.publisher_number") }}: </label>
        <el-input
          v-model="input.publisherNum"
          type="text"
          placeholder="Please enter publisher contact number..."
        />
      </el-form-item>
      <el-form-item class="button-group">
        <el-button type="success" @click="createData()">
          {{ $t("message.create_header") }}
        </el-button>
      </el-form-item>
      <el-button type="info" @click="clearData()" round>{{
        $t("message.reset_message")
      }}</el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "publisher_insert",
  data() {
    return {
      input: {
        publisherName: null,
        publisherAddr: null,
        publisherNum: null,
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
    // create new publisher in database
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
      this.input.publisherName = null;
      this.input.publisherAddr = null;
      this.input.publisherNum = null;
    },
  },
});
</script>

<style src="@/assets/css/insert-style.css"></style>
