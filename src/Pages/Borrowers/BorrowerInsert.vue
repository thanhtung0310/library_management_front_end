<template>
  <div class="insert-box">
    <el-form ref="ruleFormRef" :modal="input" :rules="rules">
      <div class="box-header">
        <p>{{ $t("message.create_message", { table: "borrower" }) }}</p>
      </div>

      <el-form-item prop="name">
        <label>{{ $t("borrowers.borrower_name") }}: </label>
        <el-input
          v-model="input.borrowerName"
          type="text"
          placeholder="Please enter borrower name..."
        />
      </el-form-item>

      <el-form-item prop="addr">
        <label>{{ $t("borrowers.borrower_address") }}: </label>
        <el-input
          v-model="input.borrowerAddr"
          type="textarea"
          placeholder="Please enter borrower address..."
        />
      </el-form-item>

      <el-form-item prop="number">
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
        addr: [
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
        borrowerName: "",
        borrowerAddr: "",
        borrowerNum: "",
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
