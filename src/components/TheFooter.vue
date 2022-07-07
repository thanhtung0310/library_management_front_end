<template>
  <footer>
    <div class="footer">
      <!-- Begin left footer section -->
      <div class="left-content">
        <div class="logo">
          <router-link to="/">{{ $t("project_name") }}</router-link>
        </div>
        <div class="footer_message">{{ $t("footer.footer_message") }}</div>
        <div class="col-lg-3 offset-lg-1">
          <div class="ft-contact">
            <h6>
              {{ $t("footer.my_info.header") }}
            </h6>
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
        <div class="content-header">
          <h3>
            {{ $t("footer.quick_links") }}
            <!-- QUICK LINKS -->
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
      <!-- End middle footer section -->

      <!-- Begin right footer section -->
      <div class="right-content">
        <div class="content-header">
          <h3>
            {{ $t("footer.contact_us") }}
          </h3>
        </div>
        <form action="#" class="form">
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Your email address"
          />
          <input
            type="text"
            name="message"
            id="message"
            placeholder="Message..."
          />
          <input type="button" value="Send" />
        </form>
      </div>
      <!-- End right footer section -->
    </div>
  </footer>
</template>

<style src="@/assets/css/footer-style.css"></style>