<template>
  <div class="update-box">
    <el-form>
      <div class="box-header">
        <p>
          {{ $t("message.update_message", { table: "publisher" }) }}
          {{ publisherID }}
        </p>
      </div>

      <el-form-item>
        <label>{{ $t("publishers.publisher_name") }}: </label>
        <el-input
          v-model="publisherName_value"
          type="text"
          placeholder="Please enter publisher name..."
        />
      </el-form-item>

      <el-form-item>
        <label>{{ $t("publishers.publisher_address") }}: </label>
        <el-input
          v-model="publisherAddr_value"
          type="textarea"
          placeholder="Please enter publisher address..."
        />
      </el-form-item>
      <el-form-item>
        <label>{{ $t("publishers.publisher_number") }}: </label>
        <el-input
          v-model="publisherNum_value"
          type="text"
          placeholder="Please enter publisher contact number..."
        />
      </el-form-item>

      <el-form-item class="button-group">
        <el-button type="success" @click="updateData()" round>
          {{ $t("message.update_header") }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import { ElMessageBox } from "element-plus";
import type { Action } from "element-plus";
import { requestMessage } from "@/axios-functions";

export default defineComponent({
  name: "publisher_update",
  data() {
    return {
      input: {
        publisherID: ref(0),
        publisherName: ref(""),
        publisherAddr: ref(""),
        publisherNum: ref(""),
      },
      publisherName_value: ref(""),
      publisherAddr_value: ref(""),
      publisherNum_value: ref(""),
    };
  },
  props: {
    publisherID: {
      default: ref(0),
      type: Number,
    },
    publisherName: {
      default: ref(""),
      type: String,
    },
    publisherAddr: {
      default: ref(""),
      type: String,
    },
    publisherNum: {
      default: ref(""),
      type: String,
    },
    baseURL: {
      default: "",
      type: String,
    },
    runMethod: Boolean,
  },
  methods: {
    getDataFromParentComp(): void {
      this.publisherName_value = this.publisherName;
      this.publisherAddr_value = this.publisherAddr;
      this.publisherNum_value = this.publisherNum;
    },
    // update new data into database
    updateData(): void {
      // parsing data from parent comp to child comp
      this.input.publisherID = this.publisherID;
      this.input.publisherName = this.publisherName_value;
      this.input.publisherAddr = this.publisherAddr_value;
      this.input.publisherNum = this.publisherNum_value;

      // parsing data into Json format
      const body = JSON.stringify(this.input);
      const headers = {
        "Content-Type": "application/json",
      };

      // open update confirmation modal
      ElMessageBox.confirm("This ID will be updated. Continue?", "Info", {
        distinguishCancelAndClose: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        draggable: true,
      })
        .then(() => {
          // call axios put callback
          axios
            .put(this.baseURL + this.publisherID, body, { headers })
            .then(() => {
              // open success notification
              requestMessage("success", "Update", "confirm");
              this.$emit("refresh");
              this.$emit("close");
            })
            .catch((error) => {
              // open error notification
              requestMessage("error", "Update", "confirm");
              console.log(error);
            });
        })
        .catch((action: Action) => {
          requestMessage("info", "Update", action);
        });
    },
  },
  watch: {
    runMethod(): void {
      this.getDataFromParentComp();
    },
  },
});
</script>

<style src="@/assets/css/update-style.css"></style>
