<template>
  <div class="user_box">
    <div class="hello_message">
      {{ $t("user_box.hello_message", { user: "Staff" }) }}
    </div>
    <div class="avatar">
      <img src="@/assets/img/avatar.jpg" alt="user_avatar_img" />
    </div>
    <div class="user_options">
      <ul>
        <li>
          <router-link to="/log-in">{{ $t("user_box.log-in") }}</router-link>
        </li>
        <li>
          <router-link to="/log-out">{{ $t("user_box.log-out") }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.user_box {
  display: flex;
}

.user_box:hover .user_options {
  display: block;
}
.avatar img {
  height: 26px;
  width: 26px;
  border-radius: 50%;
  margin-right: 10px;
}

.user_options {
  display: none;
}
</style>