<template>
  <footer>
    <div class="footer">
      <!-- Begin left footer section -->
      <div class="left-content">
        <div class="logo">
          <router-link to="/home">{{ $t("project_name") }}</router-link>
        </div>
        <div class="footer_message">{{ $t("footer.footer_message") }}</div>
        <div class="social-circle">
          <a href="#"><font-awesome-icon icon="fa-brands fa-facebook" /></a>
          <a href="#"><font-awesome-icon icon="fa-brands fa-twitter" /></a>
          <a href="#"><font-awesome-icon icon="fa-brands fa-instagram" /></a>
          <a href="#"><font-awesome-icon icon="fa-brands fa-youtube" /></a>
        </div>
      </div>
      <!-- End left footer section -->

      <!-- Begin middle footer section -->
      <div class="mid-content">
        <div class="ft-contact">
          <h3>
            {{ $t("footer.my_info.header") }}
          </h3>
          <ul>
            <li>
              {{ $t("footer.my_info.name") }}
            </li>
            <li>
              {{ $t("footer.my_info.num") }}
            </li>
            <li>
              {{ $t("footer.my_info.email") }}
            </li>
            <li>
              {{ $t("footer.my_info.addr") }}
            </li>
          </ul>
        </div>
      </div>
      <!-- End middle footer section -->

      <!-- Begin right footer section -->
      <div class="right-content">
        <div class="content-header">
          <h3>
            {{ $t("footer.quick_links") }}
          </h3>
        </div>
        <div class="content-links">
          <ul>
            <li>
              <router-link to="/about">{{ $t("nav.about") }}</router-link>
            </li>
            <li>
              <router-link to="/terms">{{ $t("nav.terms") }}</router-link>
            </li>
            <li>
              <router-link to="/privacy">{{ $t("nav.privacy") }}</router-link>
            </li>
          </ul>
        </div>
      </div>
      <!-- End right footer section -->
    </div>
  </footer>
</template>

<style src="@/assets/css/footer-style.css" scoped></style>