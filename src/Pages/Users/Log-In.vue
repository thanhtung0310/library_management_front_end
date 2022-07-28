<template>
  <div class="form">
    <el-form>
      <h3 style="text-transform: uppercase">{{ $t("user_box.log-in") }}</h3>
      <el-form-item>
        <label>{{ $t("user_box.email") }}: </label>
        <el-input
          v-model="user.userEmail"
          type="email"
          placeholder="Please enter your email..."
        />
      </el-form-item>

      <el-form-item>
        <label>{{ $t("user_box.password") }}: </label>
        <el-input
          v-model="user.userPassword"
          type="password"
          placeholder="Please enter your password..."
        />
      </el-form-item>

      <el-form-item class="button-group">
        <el-button type="success" @click="logIn()" round>
          <router-link to="/home">{{ $t("user_box.log-in") }}</router-link>
        </el-button>
        <el-button type="warning" class="forgot-password" round>
          <router-link to="/forgot-password"
            >{{ $t("user_box.forgot-password") }}?</router-link
          >
        </el-button>
        <p class="forgot-password">
          <router-link to="/sign-up">{{
            $t("user_box.signup_message")
          }}</router-link>
          <br />
          {{ $t("user_box.social_login_message") }}
        </p>
      </el-form-item>
    </el-form>

    <div class="social-icons">
      <ul>
        <li>
          <a href="#"
            ><font-awesome-icon icon="fa-brands fa-google" />Log-in using Google
            account</a
          >
        </li>
        <li>
          <a href="#"
            ><font-awesome-icon icon="fa-brands fa-facebook" />Log-in using
            Facebook account</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "log-in",
  data() {
    return {
      user: {
        userEmail: ref(""),
        userPassword: ref(""),
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

<style>
.form {
  width: 300px;
  margin: 0px auto;
  padding: 10px 30px;
  background-color: inherit;
  border-radius: 50px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
}

.social-icons ul {
  list-style: none;
}

.social-icons ul li a {
  text-decoration: none;
}

.el-form-item.button-group {
  display: inline-block;
  margin: 5px auto;
}
</style>
