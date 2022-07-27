<template>
  <div class="insert-box">
    <el-form :modal="input" :rules="rules">
      <div class="box-header">
        <p>{{ $t("message.create_message", { table: "loan order" }) }}</p>
      </div>

      <el-form-item prop="id1">
        <label>{{ $t("loans.book_id") }}: </label>
        <el-input
          v-model="input.loan_BookID"
          type="number"
          placeholder="Please scan book..."
        />
      </el-form-item>
      <el-form-item class="link">
        <router-link to="/books/insert">{{
          $t("message.create_message", { table: "book" })
        }}</router-link>
      </el-form-item>

      <el-form-item prop="id2">
        <label>{{ $t("loans.branch_id") }}: </label>
        <el-select
          v-model="branch_id"
          placeholder="Select branch"
          style="width: 100%"
        >
          <el-option
            v-for="item in branch_list"
            :key="item.branchID"
            :label="item.branchName"
            :value="item.branchID"
          >
            <span style="float: left">{{ item.branchName }}</span>
            <span
              style="
                float: right;
                color: var(--el-text-color-secondary);
                font-size: 13px;
              "
              >{{ item.branchID }}</span
            >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="link">
        <router-link to="/branches/insert">{{
          $t("message.create_message", { table: "branch" })
        }}</router-link>
      </el-form-item>

      <el-form-item prop="id3">
        <label>{{ $t("loans.borrower_id") }}: </label>
        <el-input
          v-model="input.loan_BorrowerID"
          type="text"
          placeholder="Please enter borrower ID..."
        />
      </el-form-item>
      <el-form-item class="link">
        <router-link to="/borrowers/insert">{{
          $t("message.create_message", { table: "borrower" })
        }}</router-link>
      </el-form-item>

      <el-form-item prop="date1">
        <label>{{ $t("loans.loan_date") }}: </label>
        <el-input v-model="input.loanDate" type="date" />
      </el-form-item>

      <el-form-item prop="date2">
        <label>{{ $t("loans.due_date") }}: </label>
        <el-input v-model="input.dueDate" type="date" />
      </el-form-item>

      <!-- lỗi style - không hiện button -->
      <el-form-item prop="status">
        <label>{{ $t("loans.loan_status") }}: </label> <br />
        <el-switch
          v-model="trueValue"
          class="mb-2"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          active-text="In Progress"
          inactive-text="Done"
        />
      </el-form-item>

      <el-form-item class="button-group">
        <el-button type="success" @click="createData()" round>
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
import { requestMessage, serverNotification } from "@/axios-functions";

export default defineComponent({
  name: "loan_insert",
  data() {
    return {
      branch_baseURL: "https://localhost:7123/api/branches/",
      branch_list: null,
      branch_id: ref(""),
      trueValue: ref(true),
      input: {
        loan_BookID: "",
        loan_BranchID: "",
        loan_BorrowerID: "",
        loanDate: "",
        dueDate: "",
        loanStatus: "",
      },
      rules: reactive<FormRules>({
        name: [
          {
            required: true,
            message: "Please input book title",
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: "Length should be 3 to 5",
            trigger: "blur",
          },
        ],
        ID: [
          {
            required: true,
            message: "Please choose publisher",
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: "Length should be 3 to 5",
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
    // get branch list
    getDataFromApi(): void {
      // call axios get callback
      axios
        .get(this.branch_baseURL)
        .then((response) => {
          if (response.data != null) {
            this.branch_list = response.data;
          } else {
            // open warning notification
            serverNotification("warning");
          }
        })
        .catch((error) => {
          // open error notification
          serverNotification("error");
          console.log(error);
        });
    },
    // create new loan order in database
    createData(): void {
      //
      this.input.loan_BranchID = this.branch_id;
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
        loan_BookID: "",
        loan_BranchID: "",
        loan_BorrowerID: "",
        loanDate: "",
        dueDate: "",
        loanStatus: "",
      };
    },
  },
  created() {
    this.getDataFromApi();
  },
});
</script>

<style src="@/assets/css/insert-style.css"></style>
