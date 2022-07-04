<template>
  <div class="update-box">
    <div class="box-header">
      <p>Update borrower with id {{ borrowerID }}</p>
    </div>
    <div class="form">
      <div class="form-group databox">
        <label>Borrower name: </label>
        <input
          :value="borrowerName"
          type="text"
          name="borrower_name"
          id="borrower_name"
          placeholder="Please update borrower name..."
        />
      </div>
      <div class="form-group databox">
        <label>Borrower address: </label>
        <input
          :value="borrowerAddr"
          type="text"
          name="borrower_addr"
          id="borrower_addr"
          placeholder="Please update borrower address..."
        />
      </div>
      <div class="form-group databox">
        <label>Borrower contact number: </label>
        <input
          :value="borrowerNo"
          type="text"
          name="borrower_no"
          id="borrower_no"
          placeholder="Please update borrower contact number..."
        />
      </div>
      <div class="form-group button">
        <input
          type="button"
          name="btnUpdate"
          id="btnUpdate"
          value="UPDATE"
          @click="$emit('close'), updateData()"
        />
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
        borrower_BorrowerName: this.borrowerName,
        borrower_BorrowerAddress: this.borrowerAddr,
        borrower_BorrowerPhone: this.borrowerNo,
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
    updateData(): void {
      // parse dữ liệu sang dạng JSON
      const modelParse = JSON.parse(JSON.stringify(this.input));

      // gọi API update
      axios
        .put(this.baseURL + this.borrowerID, modelParse)
        .then(() => {
          alert("Success update borrower with id = " + this.borrowerID);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>

<style src="@/assets/css/update-style.css" scoped></style>