<template>
  <div class="language-option">
    <el-select v-model="$i18n.locale" :placeholder="$i18n.locale" style="width:70px;">
      <el-option 
        v-for="(lang, i) in langs" 
        :key="`Lang${i}`" 
        :value="lang">
        {{ lang }}
      </el-option>
    </el-select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "locale-changer",
  data() {
    return { 
      langs: [
        "en", 
        "fr", 
        "vi"
      ] 
    };
  },
});
</script>