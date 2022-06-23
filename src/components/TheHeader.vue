<template>
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
      <router-link to="/loans">Loans</router-link>
      <router-link to="/about">About</router-link>
    </ul>
    <div class="burger">
      <div class="line1"></div>
      <div class="line2"></div>
      <div class="line3"></div>
    </div>
  </div>
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
      console.log("nav-active: " + isActive);

      burger?.addEventListener("click", () => {
        // Toggle nav
        nav?.classList.toggle("nav-active");

        // Toggle nav active status to true/false
        isActive = !isActive;
        console.log("nav-active: " + isActive);
      });
    },
  },
  mounted() {
    this.navSlide();
  },
});
</script>


<style>
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 8vh;
  background-color: #5d4954;
}

.logo {
  color: rgb(226, 226, 226);
  text-transform: uppercase;
  letter-spacing: 5px;
  font-size: 20px;
}

.logo a {
  text-decoration: none;
}

.nav-links {
  display: flex;
  justify-content: space-around;
  width: 30%;
}

.nav-links a {
  color: lightslategrey;
  text-decoration: none;
  letter-spacing: 3px;
  font-weight: bold;
  font-size: 14px;
}

.nav-links a.router-link-exact-active {
  color: rgb(226, 226, 226);
}

.nav-links a:hover {
  color: rgb(226, 226, 226);
}

.burger {
  display: none;
  cursor: pointer;
}

.burger > div {
  width: 25px;
  height: 2px;
  background-color: rgb(226, 226, 226);
  margin: 5px;
  transition: all 0.3s ease;
}

@media screen and (max-width: 1024px) {
  body {
    overflow-x: hidden;
  }
  .nav-links {
    position: absolute;
    right: 0px;
    height: 92vh;
    top: 8vh;
    background-color: #5d4954;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30%;
    transform: translateX(100%);
    transition: transform 0.5s ease-in;
    padding-left: 10px;
  }
  .nav-links li {
    opacity: 0;
  }
  .burger {
    display: block;
  }
}

.nav-active {
  transform: translateX(0%);
}

@keyframes navLinkFadeIn {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
}

@keyframes navLinkFadeOut {
  from {
    opacity: 1;
    transform: translateX(0px);
  }
  to {
    opacity: 0;
    transform: translateX(50px);
  }
}

.toggle .line1 {
  transform: rotate(-45deg) translate(-5px, 5px);
}

.toggle .line2 {
  opacity: 0;
}

.toggle .line3 {
  transform: rotate(+45deg) translate(-5px, -5px);
}
</style>