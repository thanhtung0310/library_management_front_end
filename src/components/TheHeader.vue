<template>
  <nav>
    <div class="header">
      <div class="logo">
        <h4>
          <router-link to="/">Library Management</router-link>
        </h4>
      </div>
      <ul class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/books">Books</router-link>
        <router-link to="/authors">Authors</router-link>
        <router-link to="/publishers">Publishers</router-link>
        <router-link to="/borrowers">Borrowers</router-link>
        <router-link to="/loans">Loans</router-link>
        <router-link to="/about">About</router-link>
      </ul>
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

export default defineComponent({
  name: "TheHeader",
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

<style src="@/assets/css/header-style.css"></style>