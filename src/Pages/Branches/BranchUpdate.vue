<template>
  <div class="update-box">
    <el-form ref="ruleFormRef" :rules="rules">
      <div class="box-header">
        <p>
          {{ $t("message.update_message", { table: "branch" }) }} {{ branchID }}
        </p>
      </div>

      <el-form-item prop="name">
        <label>{{ $t("branches.branch_name") }}: </label>
        <el-input v-model="ruleForm.name" type="text" />
      </el-form-item>

      <el-form-item prop="address">
        <label>{{ $t("branches.branch_address") }}: </label>
        <el-input v-model="ruleForm.address" type="textarea" />
      </el-form-item>

      <el-form-item class="button-group">
        <el-button type="success" @click="updateData()" round>
          {{ $t("message.update_header") }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import axios from "axios";
import { ElMessageBox } from "element-plus";
import type { Action } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { requestMessage } from "@/axios-functions";

export default defineComponent({
  name: "branch_update",
  data() {
    return {
      ruleFormRef: ref<FormInstance>(),
      input: {
        branchID: ref(0),
        branchName: ref(""),
        branchAddr: ref(""),
      },
      ruleForm: reactive({
        name: "",
        address: "",
      }),
      rules: reactive<FormRules>({
        name: [
          {
            required: true,
            message: "Please input branch name",
            trigger: "blur",
          },
          {
            min: 2,
            max: 100,
            message: "Length should be 2 to 100",
            trigger: "blur",
          },
        ],
        address: [
          {
            required: true,
            message: "Please input branch address",
            trigger: "blur",
          },
          {
            min: 2,
            max: 200,
            message: "Length should be 2 to 200",
            trigger: "blur",
          },
        ],
      }),
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
      this.ruleForm.name = this.branchName;
      this.ruleForm.address = this.branchAddr;
    },
    // update new data into database
    updateData(): void {
      // parsing data from parent comp to child comp
      this.input.branchID = this.branchID;
      this.input.branchName = this.ruleForm.name;
      this.input.branchAddr = this.ruleForm.address;

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
