<template>
  <div class="form">
    <form>
      <h3 style="text-transform: uppercase">{{ $t("user_box.sign-up") }}</h3>
      <div class="form-group">
        <label>{{ $t("user_box.fullName") }}: </label>
        <input type="text" name="fullName" id="fullName" />
      </div>
      <div class="form-group">
        <label>{{ $t("user_box.email") }}: </label>
        <input type="email" name="email" id="email" />
      </div>
      <div class="form-group">
        <label>{{ $t("user_box.password") }}: </label>
        <input type="password" name="password" id="password" />
      </div>
      <div class="form-group">
        <label>Retype your {{ $t("user_box.password") }}: </label>
        <input type="password" name="password2" id="password2" />
      </div>
      <button type="submit">{{ $t("user_box.sign-up") }}</button>
      <p class="forgot-password">
        {{ $t("user_box.already_message") }}
        <router-link :to="{ name: 'login' }">log-in?</router-link>
      </p>
    </form>
  </div>
</template>