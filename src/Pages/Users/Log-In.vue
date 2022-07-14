<template>
  <div class="form">
    <form action="">
      <h3 style="text-transform: uppercase">{{ $t("user_box.log-in") }}</h3>
      <div class="form-group">
        <label>{{ $t("user_box.email") }}: </label>
        <input
          v-model="user.userEmail"
          type="email"
          name="email"
          id="email"
          placeholder="Please enter your email..."
        />
      </div>
      <div class="form-group">
        <label>{{ $t("user_box.password") }}: </label>
        <input
          v-model="user.userPassword"
          type="password"
          name="password"
          id="password"
          placeholder="Please enter your password..."
        />
      </div>
      <button type="submit" @click="logIn()">
        <router-link to="/home">{{ $t("user_box.log-in") }}</router-link>
      </button>
      <p class="forgot-password">
        <router-link to="/forgot-password"
          >{{ $t("user_box.forgot-password") }}?</router-link
        >
      </p>
      <p class="forgot-password">
        <router-link to="/sign-up">{{
          $t("user_box.signup_message")
        }}</router-link>
        <br />
        {{ $t("user_box.social_login_message") }}
      </p>

      <div class="social-icons">
        <ul>
          <li>
            <a href="#"><font-awesome-icon icon="fa-brands fa-google" /></a>
          </li>
          <li>
            <a href="#"><font-awesome-icon icon="fa-brands fa-facebook" /></a>
          </li>
        </ul>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "log-in",
  data() {
    return {
      user: {
        userEmail: null,
        userPassword: null,
      },
    };
  },
  methods: {
    logIn(): void {
      alert(
        "User " +
          this.user.userEmail +
          " with password " +
          this.user.userPassword
      );
    },
  },
});
</script>
