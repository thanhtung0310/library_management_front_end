<template>
  <div class="update-box">
    <el-form>
      <div class="box-header">
        <p>
          {{ $t("message.update_message", { table: "borrower" }) }}
          {{ borrowerID }}
        </p>
      </div>

      <el-form-item>
        <label>{{ $t("borrowers.borrower_name") }}: </label>
        <el-input
          v-model="borrowerName_value"
          type="text"
          placeholder="Please enter borrower name..."
        />
      </el-form-item>

      <el-form-item>
        <label>{{ $t("borrowers.borrower_address") }}: </label>
        <el-input
          v-model="borrowerAddr_value"
          type="textarea"
          placeholder="Please enter borrower address..."
        />
      </el-form-item>

      <el-form-item>
        <label>{{ $t("borrowers.borrower_number") }}: </label>
        <el-input
          v-model="borrowerNum_value"
          type="text"
          placeholder="Please enter borrower contact number..."
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
  name: "borrower_update",
  data() {
    return {
      input: {
        borrowerID: ref(0),
        borrowerName: ref(""),
        borrowerAddr: ref(""),
        borrowerNum: ref(""),
      },
      borrowerName_value: ref(""),
      borrowerAddr_value: ref(""),
      borrowerNum_value: ref(""),
    };
  },
  props: {
    borrowerID: {
      default: ref(0),
      type: Number,
    },
    borrowerName: {
      default: ref(""),
      type: String,
    },
    borrowerAddr: {
      default: ref(""),
      type: String,
    },
    borrowerNum: {
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
      this.borrowerName_value = this.borrowerName;
      this.borrowerAddr_value = this.borrowerAddr;
      this.borrowerNum_value = this.borrowerNum;
    },
    // update new data into database
    updateData(): void {
      // parsing data from parent comp to child comp
      this.input.borrowerID = this.borrowerID;
      this.input.borrowerName = this.borrowerName_value;
      this.input.borrowerAddr = this.borrowerAddr_value;
      this.input.borrowerNum = this.borrowerNum_value;

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
            .put(this.baseURL + this.borrowerID, body, { headers })
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
