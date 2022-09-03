// Quản lý router

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Blogs from "../views/Blogs.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ForgotPassword from "../views/ForgotPassword";
import Admin from "../views/Admin";
import Profile from "../views/Profile";
import CreatePost from "../views/CreatePost";
import BlogPreview from "../views/BlogPreview";
import ViewBlog from "../views/ViewBlog";
import EditBlog from "../views/EditBlog";
import firebase from "firebase/app";
import "firebase/storage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: 'Home',
      requiresAuth:false
    }
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: Blogs,
    meta: {
      title: 'Blogs',
      requiresAuth:false

    }
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      title: 'ForgotPassword',
      requiresAuth:false

    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: 'Login',
      requiresAuth:false

    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: 'Register',
      requiresAuth:false,

    }
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      title: 'Admin',
      requiresAuth:true,
      requiresAdmin:true

    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: 'Profile',
      requiresAuth:true

    }
  },
  {
    path: "/create-post",
    name: "CreatePost",
    component: CreatePost,
    meta: {
      title: 'CreatePost',
      requiresAuth:true,
      requiresAdmin:true

    }
  },
  {
    path: "/blog-review",
    name: "BlogPreview",
    component: BlogPreview,
    meta: {
      title: 'BlogPreview',
      requiresAuth:false

    }
  },
  {
    path: "/view-blog/:blogid",
    name: "ViewBlog",
    component: ViewBlog,
    meta: {
      title: 'ViewBlog',
      requiresAuth:false

    }
  },
  {
    path: "/edit-blog/:blogid",
    name: "EditBlog",
    component: EditBlog,
    meta: {
      title: 'EditBlog',
      requiresAuth:true,
      requiresAdmin:true

    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to?.meta?.title}`;
  next();
});
router.beforeEach(async (to, from, next) => {
  let user = firebase.auth().currentUser;
  let isAdmin = false;
  if (user) {
    // const token = await user.getIdTokenResult();
    // isAdmin = await token.claim.admin;
    isAdmin = true;
  }
  if (to.matched.some((res) => res.meta.requiresAuth)) {
    if (user) {
      if (to.matched.some((res) => res.meta.requiresAdmin)) {
        if (isAdmin) {
          return next();
        }
        return next({ name: "Home" });
      }
      return next();
    }
    return next({ name: "Home" });
  }
  return next();
});

export default router;
