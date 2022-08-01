<template>
  <div class="insert-box">
    <el-form ref="ruleFormRef" :rules="rules">
      <div class="box-header">
        <p>{{ $t("message.create_message", { table: "borrower" }) }}</p>
      </div>

      <el-form-item prop="name">
        <template #label>{{ $t("borrowers.borrower_name") }}: </template>
        <el-input
          v-model="ruleForm.name"
          type="text"
          placeholder="Please enter borrower name..."
        />
      </el-form-item>

      <el-form-item prop="address">
        <template #label>{{ $t("borrowers.borrower_address") }}: </template>
        <el-input
          v-model="ruleForm.address"
          type="textarea"
          placeholder="Please enter borrower address..."
        />
      </el-form-item>

      <el-form-item prop="number">
        <template #label>{{ $t("borrowers.borrower_number") }}: </template>
        <el-input
          v-model="ruleForm.number"
          type="text"
          placeholder="Please enter borrower contact number..."
        />
      </el-form-item>

      <el-form-item class="button-group">
        <el-button type="success" @click="createData(ruleFormRef)" round>
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
  name: "borrower_insert",
  data() {
    return {
      ruleFormRef: ref<FormInstance>(),
      input: {
        borrowerName: ref(""),
        borrowerAddr: ref(""),
        borrowerNum: ref(""),
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
            message: "Please input borrower name",
            trigger: "blur",
          },
          {
            min: 3,
            max: 100,
            message: "Length should between 3 and 100",
            trigger: "blur",
          },
        ],
        address: [
          {
            required: true,
            message: "Please input borrower address",
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
            message: "Please input borrower contact number",
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
    baseURL: {
      type: String,
      default: "",
    },
  },
  methods: {
    // create new book in database
    createData(formEl: FormInstance | undefined): void {
      //
      this.input.borrowerName = this.ruleForm.name;
      this.input.borrowerAddr = this.ruleForm.address;
      this.input.borrowerNum = this.ruleForm.number;
      // input validation
      if (!formEl) return;
      formEl.validate((valid, fields) => {
        if (!valid) {
          // open error notification
          requestMessage("error", "Insert", "confirm");
          console.log("submits!", fields);
          return;
        }
      });
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
        borrowerName: "",
        borrowerAddr: "",
        borrowerNum: "",
      };
    },
    // submit form
    submitForm(formEl: FormInstance | undefined) {
      if (!formEl) return;
      if (!formEl) return;
      formEl.validate((valid, fields) => {
        if (!valid) {
          // open error notification
          requestMessage("error", "Insert", "confirm");
          console.log("error submit!", fields);
          return;
        }
      });
    },
  },
});
</script>

<style src="@/assets/css/insert-style.css"></style>
