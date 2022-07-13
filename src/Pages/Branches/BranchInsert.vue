<template>
  <div v-if="show" class="insert-box">
    <div class="box-header">
      <p>{{ $t("message.create_message", { table: "branch" }) }}</p>
    </div>
    <div class="form">
      <div class="form-group databox">
        <label>{{ $t("branches.branch_name") }}: </label>
        <input
          v-model="input.branchName"
          type="text"
          name="branch_name"
          id="branch name"
          placeholder="Please enter branch name..."
        />
      </div>
      <div class="form-group databox">
        <label>{{ $t("branches.branch_address") }}: </label>
        <input
          v-model="input.branchAddr"
          type="text"
          name="branch_address"
          id="branch_address"
          placeholder="Please enter branch address..."
        />
      </div>
      <div class="form-group button">
        <button type="submit" @click="$emit('close'), createData()">
          {{ $t("message.create_header") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "branch_insert",
  data() {
    return {
      baseURL: "https://localhost:7123/api/branches/",
      input: {
        branchName: null,
        branchAddr: null,
      },
    };
  },
  props: {
    show: Boolean,
  },
  methods: {
    // create new branch in database
    createData(): void {
      // call axios post callback
      axios
        .post(this.baseURL, this.input)
        .then(() => {
          alert("New branch is created successfully!");
          this.clearData();
        })
        .catch((error) => {
          alert("Cannot connect to server...");
          this.clearData();
          console.log(error);
        });
    },
    // clear input data
    clearData(): void {
      this.input.branchName = null;
      this.input.branchAddr = null;
    },
  },
});
</script>


<style src="@/assets/css/insert-style.css" scoped></style>