<template>
  <el-button text @click="outerVisible = true">Details</el-button>

  <el-dialog v-model="outerVisible" title="Outer Dialog">
    <template #header>
      <h3>Details</h3>
    </template>
    <template #default>
      <el-form disabled>
        <el-form-item>
          <template #label>ID: </template>
          <el-input v-model="rowData.id" />
        </el-form-item>
        <el-form-item>
          <template #label>Name: </template>
          <el-input v-model="rowData.name" />
        </el-form-item>
        <el-form-item>
          <template #label>Address: </template>
          <el-input v-model="rowData.address" />
        </el-form-item>
        <el-form-item>
          <template #label>Phone number: </template>
          <el-input v-model="rowData.phone" />
        </el-form-item>
      </el-form>
      <el-dialog
        v-model="innerVisible"
        width="30%"
        title="Inner Dialog"
        append-to-body
      >
        <el-form>
          <el-form-item>
            <template #label>ID: </template>
            <el-input v-model="rowData.id" />
          </el-form-item>
          <el-form-item>
            <template #label>Name: </template>
            <el-input v-model="rowData.name" />
          </el-form-item>
          <el-form-item>
            <template #label>Address: </template>
            <el-input v-model="rowData.address" />
          </el-form-item>
          <el-form-item>
            <template #label>Phone number: </template>
            <el-input v-model="rowData.phone" />
          </el-form-item>
        </el-form>
      </el-dialog>
      <strong> Do you really want to edit this row? </strong>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="outerVisible = false">No thanks :3</el-button>
        <el-button type="primary" @click="innerVisible = true"
          >Absolutely yes!</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const rowData = {
  id: 1,
  name: "thanh tung",
  address: "hanoi",
  phone: "0123",
};

const outerVisible = ref(false);
const innerVisible = ref(false);
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
