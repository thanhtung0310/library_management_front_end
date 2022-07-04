<template>
  <div class="update-box">
    <div class="box-header">
      <p>Update publisher with id {{ publisherID }}</p>
    </div>
    <div class="form">
      <div class="form-group databox">
        <label>Publisher name: </label>
        <input
          :value="publisherName"
          type="text"
          name="publisher_name"
          id="publisher_name"
          placeholder="Please update publisher name..."
        />
      </div>
      <div class="form-group databox">
        <label>Publisher address: </label>
        <input
          :value="publisherAddr"
          type="text"
          name="publisher_addr"
          id="publisher_addr"
          placeholder="Please update publisher address..."
        />
      </div>
      <div class="form-group databox">
        <label>Publisher contact number: </label>
        <input
          :value="publisherNo"
          type="text"
          name="publisher_no"
          id="publisher_no"
          placeholder="Please update publisher contact number..."
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
  name: "publisher_update",
  data() {
    return {
      baseURL: "https://localhost:7123/api/publishers/",
      input: {
        publisher_PublisherName: this.publisherName,
        publisher_PublisherAddress: this.publisherAddr,
        publisher_PublisherPhone: this.publisherNo,
      },
    };
  },
  props: {
    publisherID: {
      default: 0,
      type: Number,
    },
    publisherName: {
      default: "",
      type: String,
    },
    publisherAddr: {
      default: "",
      type: String,
    },
    publisherNo: {
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
        .put(this.baseURL + this.publisherID, modelParse)
        .then(() => {
          alert("Success update publisher with id = " + this.publisherID);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>

<style src="@/assets/css/update-style.css" scoped></style>