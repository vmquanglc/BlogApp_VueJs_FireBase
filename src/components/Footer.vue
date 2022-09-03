<template>
  <footer>
    <div class="container">
      <div class="left">
        <div class="col-1">
          <router-link class="header" :to="{ name: 'Home' }">{{
            i18n.Common.TitleApp
          }}</router-link>
          <ul>
            <li>
              <a href="#"><youTube class="svg-icon" /></a>
            </li>
            <li>
              <a href="#"><twitter class="svg-icon" /></a>
            </li>
            <li>
              <a href="#"><instagram class="svg-icon" /></a>
            </li>
            <li>
              <a href="#"><linkedin class="svg-icon" /></a>
            </li>
          </ul>
        </div>
        <div class="col-2">
          <ul>
            <router-link class="link" :to="{ name: 'Home' }">{{
              i18n.Router.Home
            }}</router-link>
            <router-link class="link" :to="{ name: 'Blogs' }">{{
              i18n.Router.Blogs
            }}</router-link>
            <router-link
              v-if="isAdmin"
              class="link"
              :to="{ name: 'CreatePost' }"
              >{{ i18n.Router.CreatePost }}</router-link
            >
            <router-link v-if="!user" class="link" :to="{ name: 'Login' }">{{
              i18n.Common.LoginOrRegister
            }}</router-link>
          </ul>
        </div>
      </div>
      <div class="right">
        <p>{{ i18n.Common.Copyright }}</p>
      </div>
    </div>
  </footer>
</template>

<script>
import youTube from "../assets/Icons/youtube-brands.svg";
import twitter from "../assets/Icons/twitter-brands.svg";
import instagram from "../assets/Icons/instagram-brands.svg";
import linkedin from "../assets/Icons/linkedin-brands.svg";
import i18n from "../i18n/resource.js";
export default {
  name: "footer-vue",
  data() {
    return {
      i18n,
    };
  },
  components: {
    youTube,
    twitter,
    instagram,
    linkedin,
  },
  computed: {
    /**
     * Thong tin user dang nhap
     * vnqyabg1 3.9.2022
     */
    user() {
      return this.$store.state.user;
    },
    /**
     * check co phai Admin
     * vmquang1 3.9.2022
     */
    isAdmin() {
      return this.$store.state.profileAdmin;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../style/footer.scss";
</style>