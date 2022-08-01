<template>
  <div class="update-box">
    <el-form ref="ruleFormRef" :rules="rules">
      <div class="box-header">
        <p>
          {{ $t("message.update_message", { table: "publisher" }) }}
          {{ publisherID }}
        </p>
      </div>

      <el-form-item prop="name">
        <template #label>{{ $t("publishers.publisher_name") }}: </template>
        <el-input v-model="ruleForm.name" type="text" />
      </el-form-item>

      <el-form-item>
        <template #label>{{ $t("publishers.publisher_address") }}: </template>
        <el-input v-model="ruleForm.address" type="textarea" />
      </el-form-item>

      <el-form-item>
        <template #label>{{ $t("publishers.publisher_number") }}: </template>
        <el-input v-model="ruleForm.number" type="text" />
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
import { defineComponent, reactive, ref } from "vue";
import axios from "axios";
import { ElMessageBox } from "element-plus";
import type { Action } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { requestMessage } from "@/axios-functions";

export default defineComponent({
  name: "publisher_update",
  data() {
    return {
      ruleFormRef: ref<FormInstance>(),
      input: {
        publisherID: ref(0),
        publisherName: ref(""),
        publisherAddr: ref(""),
        publisherNum: ref(""),
      },
      ruleForm: reactive({
        name: "",
        address: "",
        number: "",
      }),
      rules: reactive<FormRules>({
        name: [
          {
            required: true,
            message: "Please input publisher name",
            trigger: "blur",
          },
          {
            min: 3,
            max: 100,
            message: "Length should between 3 and 100",
            trigger: "blur",
          },
        ],
        addr: [
          {
            required: true,
            message: "Please input publisher address",
            trigger: "blur",
          },
          {
            min: 3,
            max: 200,
            message: "Length should between 3 and 200",
            trigger: "blur",
          },
        ],
        number: [
          {
            required: true,
            message: "Please input publisher contact number",
            trigger: "blur",
          },
          {
            min: 3,
            max: 50,
            message: "Length should between 3 and 50",
            trigger: "blur",
          },
        ],
      }),
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
      this.ruleForm.name = this.publisherName;
      this.ruleForm.address = this.publisherAddr;
      this.ruleForm.number = this.publisherNum;
    },
    // update new data into database
    updateData(): void {
      // parsing data from parent comp to child comp
      this.input.publisherID = this.publisherID;
      this.input.publisherName = this.ruleForm.name;
      this.input.publisherAddr = this.ruleForm.address;
      this.input.publisherNum = this.ruleForm.number;

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
