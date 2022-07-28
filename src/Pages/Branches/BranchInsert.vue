<template>
  <div class="insert-box">
    <el-form ref="ruleFormRef" :model="input" :rules="rules">
      <div class="box-header">
        <p>{{ $t("message.create_message", { table: "branch" }) }}</p>
      </div>

      <el-form-item prop="name">
        <label>{{ $t("branches.branch_name") }}: </label>
        <el-input
          v-model="input.branchName"
          type="text"
          placeholder="Please enter branch name..."
        />
      </el-form-item>

      <el-form-item prop="addr">
        <label>{{ $t("branches.branch_address") }}: </label>
        <el-input
          v-model="input.branchAddr"
          type="textarea"
          placeholder="Please enter branch address..."
        />
      </el-form-item>

      <el-form-item class="button-group">
        <el-button type="success" @click="updateData()" round>
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
import { defineComponent, reactive, ref } from "vue";
import axios from "axios";
import { FormInstance, FormRules } from "element-plus";
import { requestMessage } from "@/axios-functions";

export default defineComponent({
  name: "branch_insert",
  data() {
    return {
      ruleFormRef: ref<FormInstance>(),
      input: {
        branchName: ref(""),
        branchAddr: ref(""),
      },
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
        addr: [
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
          requestMessage("success", "Insert", "confirm");
          this.clearData();
          this.$emit("refresh");
          this.$emit("close");
        })
        .catch((error) => {
          // open error notification
          requestMessage("error", "Insert", "confirm");
          console.log(error);
        });
    },
    // clear input data
    clearData(): void {
      this.input = {
        branchName: "",
        branchAddr: "",
      };
    },
    // submit form
    submitForm(formEl: FormInstance | undefined) {
      if (!formEl) return;
      formEl.validate((valid, fields) => {
        if (!valid) {
          // open error notification
          requestMessage("error", "Insert", "confirm");
          console.log("error submit!", fields);
          return;
        }
        this.createData();
      });
    },
  },
});
</script>

<style src="@/assets/css/insert-style.css"></style>
