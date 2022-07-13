<template>
  <div class="update-box">
    <div class="box-header">
      <p>
        {{ $t("message.update_message", { table: "branch" }) }} {{ branchID }}
      </p>
    </div>
    <div class="form">
      <div class="form-group databox">
        <label>{{ $t("branches.branch_name") }}: </label>
        <input
          :value="branchName"
          type="text"
          name="branch_name"
          id="branch_name"
          placeholder="Please update branch name..."
        />
      </div>
      <div class="form-group databox">
        <label>{{ $t("branches.branch_address") }}: </label>
        <input
          :value="branchAddr"
          type="text"
          name="branch_address"
          id="branch_address"
          placeholder="Please update branch address..."
        />
      </div>
      <div class="form-group button">
        <button type="submit" @click="$emit('close'), updateData()">
          {{ $t("message.update_header") }}
        </button>
      </div>
    </div>
  </div>
</template>>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "branch_update",
  data() {
    return {
      baseURL: "https://localhost:7123/api/branches/",
      input: {
        branchID: this.branchID,
        branchName: this.branchName,
        branchAddr: this.branchAddr,
      },
    };
  },
  props: {
    branchID: {
      default: 0,
      type: Number,
    },
    branchName: {
      default: 0,
      type: Number,
    },
    branchAddr: {
      default: "",
      type: String,
    },
  },
  methods: {
    // update new data into database
    updateData(): void {
      // parsing data from parent comp to child comp
      this.input.branchID = this.branchID;
      this.input.branchName = this.branchName;
      this.input.branchAddr = this.branchAddr;

      // parsing data into Json format
      const body = JSON.stringify(this.input);
      const headers = {
        "Content-Type": "application/json",
      };

      // gọi API update
      axios
        .put(this.baseURL + this.branchID, body, { headers })
        .then(() => {
          alert("Success update branch with id = " + this.branchID);
        })
        .catch((error) => {
          alert("Cannot connect to server...");
          console.log(error);
        });
    },
  },
});
</script>

<style src="@/assets/css/update-style.css" scoped></style>