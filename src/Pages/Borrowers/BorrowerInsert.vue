<template>
  <div v-if="show" class="insert-box">
    <div class="box-header">
      <p>Create new borrower</p>
    </div>
    <div class="form">
      <div class="form-group databox">
        <label>Borrower name: </label>
        <input
          v-model="input.borrower_BorrowerName"
          type="text"
          name="borrower_name"
          id="borrower_name"
          placeholder="Please enter borrower name..."
        />
      </div>
      <div class="form-group databox">
        <label>Borrower address: </label>
        <input
          v-model="input.borrower_BorrowerAddress"
          type="text"
          name="borrower_addr"
          id="borrower_addr"
          placeholder="Please enter borrower address..."
        />
      </div>
      <div class="form-group databox">
        <label>Borrower contact number: </label>
        <input
          v-model="input.borrower_BorrowerPhone"
          type="text"
          name="borrower_no"
          id="borrower_no"
          placeholder="Please enter borrower contact number..."
        />
      </div>
      <div class="form-group button">
        <input
          type="button"
          name="btnCreate"
          id="btnCreate"
          value="CREATE"
          @click="$emit('close'), createBorrower()"
        />
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
      baseURL: "https://localhost:7123/api/borrowers/",
      data: null,
      input: {
        borrower_BorrowerName: null,
        borrower_BorrowerAddress: null,
        borrower_BorrowerPhone: null,
      },
    };
  },
  props: {
    show: Boolean,
  },
  methods: {
    createBorrower(): void {
      axios
        .post(this.baseURL, this.input)
        .then((response) => {
          this.data = response.data;
          alert("Borrower is created successfully!");
          this.clearData();
        })
        .catch((error) => {
          console.log(error);
          this.clearData();
        });
    },
    clearData(): void {
      this.input.borrower_BorrowerName = null;
      this.input.borrower_BorrowerAddress = null;
      this.input.borrower_BorrowerPhone = null;
    },
  },
});
</script>


<style src="@/assets/css/insert-style.css" scoped></style>