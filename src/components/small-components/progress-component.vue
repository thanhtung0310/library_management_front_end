<template>
  <el-progress
      :text-inside="true"
      :stroke-width="20"
      :percentage="percentage"
      :color="colors"
    />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "elprogressbar-template",
  data() {
    return {
      percentage: ref(0),
      colors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 },
      ],
    };
  },
  methods: {
  },
  // onMounted(() => {
  //   setInterval(() => {
  //   percentage.value = (percentage.value % 100) + 20
  // }, 500)
  // }),
});
</script>