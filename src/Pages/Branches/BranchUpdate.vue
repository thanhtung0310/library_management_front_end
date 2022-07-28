<template>
  <div class="update-box">
    <el-form>
      <div class="box-header">
        <p>
          {{ $t("message.update_message", { table: "branch" }) }} {{ branchID }}
        </p>
      </div>

      <el-form-item>
        <label>{{ $t("branches.branch_name") }}: </label>
        <el-input v-model="branchName_value" type="text" />
      </el-form-item>

      <el-form-item>
        <label>{{ $t("branches.branch_address") }}: </label>
        <el-input v-model="branchAddr_value" type="textarea" />
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
  name: "branch_update",
  data() {
    return {
      input: {
        branchID: ref(0),
        branchName: ref(""),
        branchAddr: ref(""),
      },
      branchName_value: ref(""),
      branchAddr_value: ref(""),
    };
  },
  props: {
    branchID: {
      default: ref(0),
      type: Number,
    },
    branchName: {
      default: ref(""),
      type: String,
    },
    branchAddr: {
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
      this.branchName_value = this.branchName;
      this.branchAddr_value = this.branchAddr;
    },
    // update new data into database
    updateData(): void {
      // parsing data from parent comp to child comp
      this.input.branchID = this.branchID;
      this.input.branchName = this.branchName_value;
      this.input.branchAddr = this.branchAddr_value;

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
            .put(this.baseURL + this.branchID, body, { headers })
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
