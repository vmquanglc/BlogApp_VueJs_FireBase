<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'Home' }"
          >{{i18n.Common.TitleApp}}</router-link
        >
      </div>
      <div class="nav-links">
        <ul v-show="!mobile">
          <router-link class="link" :to="{ name: 'Home' }">{{i18n.Router.Home}}</router-link>
          <router-link class="link" :to="{ name: 'Blogs' }">{{i18n.Router.Blogs}}</router-link>
          <router-link v-if="isAdmin" class="link" :to="{ name: 'CreatePost' }"
            >{{i18n.Router.CreatePost}}</router-link
          >
          <router-link v-if="!user" class="link" :to="{ name: 'Login' }"
            >{{i18n.Common.LoginOrRegister}}</router-link
          >
          <!-- <router-link v-if="isAdmin" class="link" :to="{ name: 'AuditingLogs' }"
            >Auditing logs</router-link
          >
          <router-link v-if="isAdmin" class="link" :to="{ name: 'Report' }"
            >Report</router-link
          > -->
        </ul>
        <!-- dropdown info user -->
        <div
          v-if="user"
          @click="showProfileMenu($event)"
          class="profile"
          ref="profile"
          v-click-outside="onClickOutsideProfileMenu"
        >
          <!-- name -->
          <span>{{ this.$store.state.profileInitials }}</span>
          <div v-show="isShowProfileMenu" class="profile-menu">
            <div class="info">
              <!-- name -->
              <p class="initials">{{ this.$store.state.profileInitials }}</p>
              <div class="right">
                <p>
                  {{ this.$store.state.profileFirstName }}
                  {{ this.$store.state.profileLastName }}
                </p>
                <p>{{ this.$store.state.profileUsername }}</p>
                <p>{{ this.$store.state.profileEmail }}</p>
              </div>
            </div>
            <div class="options">
              <div class="option">
                <router-link class="option" :to="{ name: 'Profile' }">
                  <userIcon class="icon" />
                  <p>{{i18n.Common.Profile}}</p>
                </router-link>
              </div>
              <div v-if="isAdmin" class="option">
                <router-link class="option" :to="{ name: 'Admin' }">
                  <adminIcon class="icon" />
                  <p>{{i18n.Common.Admin}}</p>
                </router-link>
              </div>
              <div @click="onSignOut" class="option">
                <signOutIcon class="icon" />
                <p>{{i18n.Common.SignOut}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <menuIcon @click="toggleMobileNav" v-show="mobile" class="menu-icon" />
    <!-- hien thi mobile mode -->
    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNav"  v-click-outside="onClickOutsideMobile">
        <router-link class="link" :to="{ name: 'Home' }">{{i18n.Router.Home}}</router-link>
        <router-link class="link" :to="{ name: 'Blogs' }">{{i18n.Router.Blogs}}</router-link>
        <router-link v-if="isAdmin" class="link" :to="{ name: 'CreatePost' }"
          >{{i18n.Router.CreatePost}}</router-link
        >
        <router-link class="link" :to="{ name: 'Login' }"
          >{{i18n.Common.LoginOrRegister}}</router-link
        >
      </ul>
    </transition>
  </header>
</template>
<script>
import menuIcon from "../assets/Icons/bars-regular.svg";
import userIcon from "../assets/Icons/user-alt-light.svg";
import adminIcon from "../assets/Icons/user-crown-light.svg";
import signOutIcon from "../assets/Icons/sign-out-alt-regular.svg";
import vClickOutside from "v-click-outside";
import firebase from "firebase/app";
import "firebase/auth";
import i18n from "../i18n/resource.js";
// import db from "../firebase/firebaseInit";
export default {
  name: "navigation",
  components: {
    menuIcon,
    userIcon,
    adminIcon,
    signOutIcon,
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      i18n,
      /**
       * c??? ???n/hi???n profilemenu
       */
      isShowProfileMenu: false,
      /**
       * c??? check mobie Mode
       * vmquang1 2.9.2022
       */
      mobile: null,
      /**
       * check show navMobile
       */
      mobileNav: null,
      windowWidth: null,
    };
  },
  /**
   * Hook b???t ?????u component
   */
  created() {
    const me = this;

    //b???t s??? ki???n resize th?? check ???n/hi???n mobile Mode
    window.addEventListener("resize", me.checkScreen);
    me.checkScreen();
  },
  methods: {
    /**
     * event click outside mobile nav
     * vmquang1 3.9.2022
     */
    onClickOutsideMobile(){
      // const me = this;
      // if(me.mobileNav){
      //   me.mobileNav = false;
      // }
    },
    /**
     * event SignOut
     */
    onSignOut() {
      firebase.auth().signOut();
      window.location.reload();
    },
    /**
     * event click outside ???n profileMenu
     * vmquang1 3.9.2022
     */
    onClickOutsideProfileMenu() {
      if (this.isShowProfileMenu) {
        this.isShowProfileMenu = false;
      }
      return;
    },
    /**
     * H??m show profile Menu
     */
    showProfileMenu(e) {
      //???n v??o icon th?? ???n/hi???n
      if (e && e.target === this.$refs.profile) {
        this.isShowProfileMenu = !this.isShowProfileMenu;
        return;
      }
    },
    /**
     * ham check widht window
     * vmquang 2.9.2022
     */
    checkScreen() {
      const me = this;

      //l???y with hi???n t???i
      me.windowWidth = window.innerWidth;

      //n???u witdh <= 750px th?? hi???n th??? mobileMode
      const limitDisplayMobileMode = 750;
      const isDisplayMobileMode = me.windowWidth <= limitDisplayMobileMode;
      if (isDisplayMobileMode) {
        me.mobile = true;
        return;
      }
      me.mobile = false;
      me.mobileNav = false;
      return;
    },
    /**
     * ???n hi???n mobile mode
     * vmquang1 2.9.2022
     */
    toggleMobileNav() {
      const me = this;
      me.mobileNav = !me.mobileNav;
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    isAdmin(){
      return this.$store.state.profileAdmin
    }
  },
};
</script>
<style lang="scss" scoped>
@import '../style/navigation.scss'
</style>