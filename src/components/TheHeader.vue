<template>
  <nav>
    <div class="header">
      <div class="logo">
        <h4>
          <router-link to="/home">{{ $t("project_name") }}</router-link>
        </h4>
      </div>
      <TheSearch />
      <ul class="nav-links">
        <router-link to="/home">{{ $t("nav.home") }}</router-link>
        <router-link to="/books">{{ $t("nav.books") }}</router-link>
        <router-link to="/authors">{{ $t("nav.authors") }}</router-link>
        <router-link to="/publishers">{{ $t("nav.publishers") }}</router-link>
        <router-link to="/borrowers">{{ $t("nav.borrowers") }}</router-link>
        <router-link to="/loans">{{ $t("nav.loans") }}</router-link>
      </ul>
      <TheUserBox />
      <TheLangSwitcher />
      <div class="burger">
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheSearch from "./TheSearch.vue";
import TheLangSwitcher from "./TheLangSwitcher.vue";
import TheUserBox from "./TheUserBox.vue";

export default defineComponent({
  name: "TheHeader",
  components: {
    TheSearch,
    TheLangSwitcher,
    TheUserBox,
  },
  methods: {
    navSlide(): void {
      let burger = document.querySelector(".burger");
      let nav = document.querySelector(".nav-links");
      let isActive = false;
      burger?.addEventListener("click", () => {
        // Toggle nav
        nav?.classList.toggle("nav-active");
        // Toggle nav active status to true/false
        isActive = !isActive;
      });
    },
  },
  mounted() {
    this.navSlide();
  },
});
</script>

<style src="@/assets/css/header-style.css" scoped></style>