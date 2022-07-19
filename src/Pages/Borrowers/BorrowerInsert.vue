<template>
  <div v-if="show" class="insert-box">
    <div class="box-header">
      <p>{{ $t("message.create_message", { table: "borrower" }) }}</p>
    </div>
    <div class="form">
      <div class="form-group databox">
        <label>{{ $t("borrowers.borrower_name") }}: </label>
        <input
          v-model="input.borrowerName"
          type="text"
          name="borrower_name"
          id="borrower_name"
          placeholder="Please enter borrower name..."
        />
      </div>
      <div class="form-group databox">
        <label>{{ $t("borrowers.borrower_address") }}: </label>
        <input
          v-model="input.borrowerAddr"
          type="text"
          name="borrower_addr"
          id="borrower_addr"
          placeholder="Please enter borrower address..."
        />
      </div>
      <div class="form-group databox">
        <label>{{ $t("borrowers.borrower_number") }}: </label>
        <input
          v-model="input.borrowerNum"
          type="text"
          name="borrower_no"
          id="borrower_no"
          placeholder="Please enter borrower contact number..."
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
  name: "borrower_insert",
  data() {
    return {
      // baseURL: "https://localhost:7123/api/borrowers/",
      input: {
        borrowerName: null,
        borrowerAddr: null,
        borrowerNum: null,
      },
    };
  },
  props: {
    show: Boolean,
    baseURL: {
      type: String, 
      default: "",
    }
  },
  methods: {
    // create new borrower in database
    createData(): void {
      // call axios post callback
      axios
        .post(this.baseURL, this.input)
        .then(() => {
          alert("New borrower is created successfully!");
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
      this.input.borrowerName = null;
      this.input.borrowerAddr = null;
      this.input.borrowerNum = null;
    },
  },
});
</script>


<style src="@/assets/css/insert-style.css"></style>