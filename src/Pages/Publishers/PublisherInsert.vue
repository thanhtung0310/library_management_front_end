<template>
  <div v-if="show" class="insert-box">
    <div class="box-header">
      <p>Create new publisher</p>
    </div>
    <div class="form">
      <div class="form-group databox">
        <label>Publisher name: </label>
        <input
          v-model="input.publisher_PublisherName"
          type="text"
          name="publisher_name"
          id="publisher_name"
          placeholder="Please enter publisher name..."
        />
      </div>
      <div class="form-group databox">
        <label>Publisher address: </label>
        <input
          v-model="input.publisher_PublisherAddress"
          type="text"
          name="publisher_addr"
          id="publisher_addr"
          placeholder="Please enter publisher address..."
        />
      </div>
      <div class="form-group databox">
        <label>Publisher contact number: </label>
        <input
          v-model="input.publisher_PublisherPhone"
          type="text"
          name="publisher_no"
          id="publisher_no"
          placeholder="Please enter publisher contact number..."
        />
      </div>
      <div class="form-group button">
        <input
          type="button"
          name="btnCreate"
          id="btnCreate"
          value="CREATE"
          @click="$emit('close'), createPublisher()"
        />
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
      baseURL: "https://localhost:7123/api/publishers/",
      data: null,
      input: {
        publisher_PublisherName: null,
        publisher_PublisherAddress: null,
        publisher_PublisherPhone: null,
      },
    };
  },
  props: {
    show: Boolean,
  },
  methods: {
    createPublisher(): void {
      axios
        .post(this.baseURL, this.input)
        .then((response) => {
          this.data = response.data;
          alert("Publisher is created successfully!");
          this.clearData();
        })
        .catch((error) => {
          console.log(error);
          this.clearData();
        });
    },
    clearData(): void {
      this.input.publisher_PublisherName = null;
      this.input.publisher_PublisherAddress = null;
      this.input.publisher_PublisherPhone = null;
    },
  },
});
</script>


<style src="@/assets/css/insert-style.css" scoped></style>