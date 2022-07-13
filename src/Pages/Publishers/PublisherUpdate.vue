<template>
  <div class="update-box">
    <div class="box-header">
      <p>
        {{ $t("message.update_message", { table: "publisher" }) }}
        {{ publisherID }}
      </p>
    </div>
    <div class="form">
      <div class="form-group databox">
        <label>{{ $t("publishers.publisher_name") }}: </label>
        <input
          :value="publisherName"
          type="text"
          name="publisher_name"
          id="publisher_name"
          placeholder="Please update publisher name..."
        />
      </div>
      <div class="form-group databox">
        <label>{{ $t("publishers.publisher_address") }}: </label>
        <input
          :value="publisherAddr"
          type="text"
          name="publisher_addr"
          id="publisher_addr"
          placeholder="Please update publisher address..."
        />
      </div>
      <div class="form-group databox">
        <label>{{ $t("publishers.publisher_number") }}: </label>
        <input
          :value="publisherNo"
          type="text"
          name="publisher_no"
          id="publisher_no"
          placeholder="Please update publisher contact number..."
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
  name: "publisher_update",
  data() {
    return {
      baseURL: "https://localhost:7123/api/publishers/",
      input: {
        publisherID: this.publisherID,
        publisherName: this.publisherName,
        publisherAddr: this.publisherAddr,
        publisherNum: this.publisherNo,
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
    // update new data into database
    updateData(): void {
      // parsing data from parent comp to child comp
      this.input.publisherID = this.publisherID;
      this.input.publisherName = this.publisherName;
      this.input.publisherAddr = this.publisherAddr;
      this.input.publisherNum = this.publisherNo;

      // parsing data into Json format
      const body = JSON.stringify(this.input);
      const headers = {
        "Content-Type": "application/json",
      };

      // call axios put callback
      axios
        .put(this.baseURL + this.publisherID, body, { headers })
        .then(() => {
          alert("Success update publisher with id = " + this.publisherID);
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