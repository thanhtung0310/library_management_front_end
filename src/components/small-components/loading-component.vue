<template>
  <el-button
    v-loading.fullscreen.lock="fullscreenLoading"
    type="primary"
    @click="openFullLoadingScreen"
  >
    Click here to load screen
  </el-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "elloading-template",
  data() {
    return {
      fullscreenLoading: false,
    };
  },
  methods: {
    // loading full screen
    openFullLoadingScreen() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 2000);
    },
  },
});
</script>