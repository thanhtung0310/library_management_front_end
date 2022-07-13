<template>
  <div class="language-option">
    <!-- <img src="@/assets/img/flag.jpg" alt="" /> -->
    <!-- <span style="color: white"
      >EN <font-awesome-icon icon="fa-solid fa-globe"
    /></span>
    <div class="flag-dropdown">
      <ul>
        <li><a href="#">FR</a></li>
        <li><a href="#">VI</a></li>
      </ul>
    </div> -->
    <select v-model="$i18n.locale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
        {{ lang }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "locale-changer",
  data() {
    return { langs: ["en", "fr", "vi"] };
  },
});
</script>