<template>
  <div class="insert-box">
    <el-form :model="input" :rules="rules">
      <div class="box-header">
        <p>{{ $t("message.create_message", { table: "publisher" }) }}</p>
      </div>

      <el-form-item prop="name">
        <label>{{ $t("publishers.publisher_name") }}: </label>
        <el-input
          v-model="input.publisherName"
          type="text"
          placeholder="Please enter publisher name..."
        />
      </el-form-item>

      <el-form-item prop="addr">
        <label>{{ $t("publishers.publisher_address") }}: </label>
        <el-input
          v-model="input.publisherAddr"
          type="textarea"
          placeholder="Please enter publisher address..."
        />
      </el-form-item>

      <el-form-item prop="number">
        <label>{{ $t("publishers.publisher_number") }}: </label>
        <el-input
          v-model="input.publisherNum"
          type="text"
          placeholder="Please enter publisher contact number..."
        />
      </el-form-item>

      <el-form-item class="button-group">
        <el-button type="success" @click="createData()" round>
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
import { defineComponent, reactive, ref } from "vue";
import axios from "axios";
import { FormInstance, FormRules } from "element-plus";
import { requestMessage } from "@/axios-functions";

export default defineComponent({
  name: "publisher_insert",
  data() {
    return {
      input: {
        publisherName: ref(""),
        publisherAddr: ref(""),
        publisherNum: ref(""),
      },
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
          requestMessage("success", "Insert", "confirm");
          this.clearData();
          this.$emit("refresh");
          this.$emit("close");
        })
        .catch((error) => {
          // open error notification
          requestMessage("success", "Insert", "confirm");
          console.log(error);
        });
    },
    // clear input data
    clearData(): void {
      this.input = {
        publisherName: "",
        publisherAddr: "",
        publisherNum: "",
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
