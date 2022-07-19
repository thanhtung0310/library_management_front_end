<template>
  <div v-if="show" class="insert-box">
    <div class="box-header">
      <p>{{ $t("message.create_message", { table: "publisher" }) }}</p>
    </div>
    <div class="form">
      <div class="form-group databox">
        <label>{{ $t("publishers.publisher_name") }}: </label>
        <input
          v-model="input.publisherName"
          type="text"
          name="publisher_name"
          id="publisher_name"
          placeholder="Please enter publisher name..."
        />
      </div>
      <div class="form-group databox">
        <label>{{ $t("publishers.publisher_address") }}: </label>
        <input
          v-model="input.publisherAddr"
          type="text"
          name="publisher_addr"
          id="publisher_addr"
          placeholder="Please enter publisher address..."
        />
      </div>
      <div class="form-group databox">
        <label>{{ $t("publishers.publisher_number") }}: </label>
        <input
          v-model="input.publisherNum"
          type="text"
          name="publisher_no"
          id="publisher_no"
          placeholder="Please enter publisher contact number..."
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
  name: "publisher_insert",
  data() {
    return {
      // baseURL: "https://localhost:7123/api/publishers/",
      input: {
        publisherName: null,
        publisherAddr: null,
        publisherNum: null,
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
    // create new publisher in database
    createData(): void {
      // call axios post callback
      axios
        .post(this.baseURL, this.input)
        .then(() => {
          alert("New publisher is created successfully!");
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
      this.input.publisherName = null;
      this.input.publisherAddr = null;
      this.input.publisherNum = null;
    },
  },
});
</script>


<style src="@/assets/css/insert-style.css"></style>