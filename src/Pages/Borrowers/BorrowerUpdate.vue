<template>
  <div class="update-box">
    <div class="box-header">
      <p>
        {{ $t("message.update_message", { table: "borrower" }) }}
        {{ borrowerID }}
      </p>
    </div>
    <div class="form">
      <div class="form-group databox">
        <label>{{ $t("borrowers.borrower_name") }}: </label>
        <input
          :value="borrowerName"
          type="text"
          name="borrower_name"
          id="borrower_name"
          placeholder="Please update borrower name..."
        />
      </div>
      <div class="form-group databox">
        <label>{{ $t("borrowers.borrower_address") }}: </label>
        <input
          :value="borrowerAddr"
          type="text"
          name="borrower_addr"
          id="borrower_addr"
          placeholder="Please update borrower address..."
        />
      </div>
      <div class="form-group databox">
        <label>{{ $t("borrowers.borrower_number") }}: </label>
        <input
          :value="borrowerNo"
          type="text"
          name="borrower_no"
          id="borrower_no"
          placeholder="Please update borrower contact number..."
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
  name: "borrower_update",
  data() {
    return {
      baseURL: "https://localhost:7123/api/borrowers/",
      input: {
        borrowerID: this.borrowerID,
        borrowerName: this.borrowerName,
        borrowerAddr: this.borrowerAddr,
        borrowerNum: this.borrowerNo,
      },
    };
  },
  props: {
    borrowerID: {
      default: 0,
      type: Number,
    },
    borrowerName: {
      default: "",
      type: String,
    },
    borrowerAddr: {
      default: "",
      type: String,
    },
    borrowerNo: {
      default: "",
      type: String,
    },
  },
  methods: {
    // update new data into database
    updateData(): void {
      // parsing data from parent comp to child comp
      this.input.borrowerID = this.borrowerID;
      this.input.borrowerName = this.borrowerName;
      this.input.borrowerAddr = this.borrowerAddr;
      this.input.borrowerNum = this.borrowerNo;

      // parsing data into Json format
      const body = JSON.stringify(this.input);
      const headers = {
        "Content-Type": "application/json",
      };

      // call axios put callback
      axios
        .put(this.baseURL + this.borrowerID, body, { headers })
        .then(() => {
          alert("Success update borrower with id = " + this.borrowerID);
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