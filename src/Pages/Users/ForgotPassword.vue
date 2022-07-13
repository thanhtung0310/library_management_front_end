<template>
  <div class="form">
    <form>
      <h3 style="text-transform: uppercase">
        {{ $t("user_box.forgot-password") }}
      </h3>
      <div class="form-group">
        <label>{{ $t("user_box.email") }}: </label>
        <input :value="userEmail" type="email" name="email" id="email" />
      </div>
      <button
        type="submit"
        style="text-transform: uppercase"
        @click="resetPwd(userEmail)"
      >
        {{ $t("user_box.reset-password") }}
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      userEmail: "",
    };
  },
  methods: {
    resetPwd(email: string): void {
      alert("Reset password with account" + email);
    },
  },
});
</script>
