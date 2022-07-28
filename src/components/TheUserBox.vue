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
          <router-link to="/">{{ $t("user_box.log-in") }}</router-link>
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
  position: absolute;
  top: 60px;
  height: 9vh;
  margin-left: -30px;
}

.user_box .user_options ul {
  list-style: none;
}

.user_box .user_options ul li a {
  text-decoration: none;
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
