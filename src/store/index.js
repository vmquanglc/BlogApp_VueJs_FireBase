import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

Vue.use(Vuex)
export default new Vuex.Store({
  /**
   * Data state
   */
  state: {
    blogPosts: [],
    postLoaded: null,
    // blogHTML: "Write your blog title here...",
    blogTitle: "",
    blogPhotoName: "",
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
    /**
     * state lưu thông tin user
     */
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    /**
     * state lưu Id user
     */
    profileId: null,
    profileInitials: null,
    /**
     * state cờ cho phép show tính năng sửa/xóa post
     * vmquang1 2.9.2022
     */
    editPost:true,
    /**
     * data Fake
     */
    sampleBlogCards: [
      {
        blogTitle: "This's filter title",
        blogCoverPhoto: "stock-1",
        blogDate: "May 1,2021",
      },
      {
        blogTitle: "This's filter title",
        blogCoverPhoto: "stock-1",
        blogDate: "May 1,2021",
      },
      {
        blogTitle: "This's filter title",
        blogCoverPhoto: "stock-1",
        blogDate: "May 1,2021",
      },
      {
        blogTitle: "This's filter title",
        blogCoverPhoto: "stock-1",
        blogDate: "May 1,2021",
      },
      {
        blogTitle: "This's filter title",
        blogCoverPhoto: "stock-1",
        blogDate: "May 1,2021",
      },
      {
        blogTitle: "This's filter title",
        blogCoverPhoto: "stock-1",
        blogDate: "May 1,2021",
      },
      {
        blogTitle: "This's filter title",
        blogCoverPhoto: "stock-1",
        blogDate: "May 1,2021",
      },
      {
        blogTitle: "This's filter title",
        blogCoverPhoto: "stock-1",
        blogDate: "May 1,2021",
      },
      {
        blogTitle: "This's filter title",
        blogCoverPhoto: "stock-1",
        blogDate: "May 1,2021",
      },
      {
        blogTitle: "This's filter title",
        blogCoverPhoto: "stock-1",
        blogDate: "May 1,2021",
      },
      {
        blogTitle: "This's filter title",
        blogCoverPhoto: "stock-1",
        blogDate: "May 1,2021",
      },
      {
        blogTitle: "This's filter title",
        blogCoverPhoto: "stock-1",
        blogDate: "May 1,2021",
      },
      {
        blogTitle: "This's filter title",
        blogCoverPhoto: "stock-1",
        blogDate: "May 1,2021",
      },
      {
        blogTitle: "This's filter title",
        blogCoverPhoto: "stock-1",
        blogDate: "May 1,2021",
      },
      {
        blogTitle: "This's filter title",
        blogCoverPhoto: "stock-1",
        blogDate: "May 1,2021",
      },
      {
        blogTitle: "This's filter title",
        blogCoverPhoto: "stock-1",
        blogDate: "May 1,2021",
      },
      {
        blogTitle: "This's filter title",
        blogCoverPhoto: "stock-1",
        blogDate: "May 1,2021",
      },
      {
        blogTitle: "This is a filter 2",
        blogCoverPhoto: "stock-1",
        blogDate: "May 1,2021",
      },
    ],
  },
  mutations: {
    setBlogState(state, payload) {
      state.blogTitle = payload.blogTitle;
      state.blogHTML = payload.blogHTML;
      state.blogPhotoFileURL = payload.blogCoverPhoto;
      state.blogPhotoName = payload.blogCoverPhotoName;
    },
    /**
     * Mở xem ảnh preview
     * @param {*} state state
     */
    openPhotoPreview(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },
    fileNameChange(state, payload) {
      state.blogPhotoName = payload;
    },
    createFileURL(state, payload) {
      state.blogPhotoFileURL = payload;
    },
    newBlogPost(state, payload) {
      state.blogHTML = payload;
      console.log(state.blogHTML);
    },
    updateBlogTitle(state, payload) {
      state.blogTitle = payload;
    },
    toggleEditPost(state,hasAllowEdit){
      state.editPost = hasAllowEdit;
      // console.log(state.editPost);
    },
    /**
     * Hàm cập nhật user
     * @param {*} state state
     * @param {*} payLoad tham số
     * vmquang1 3.9.2022
     */
    updateUser(state,payLoad){
      state.user = payLoad;
      console.log('updateUser',state.user);
    },
    /**
     * hàm set id user
     * @param {*} state state
     * @param {*} doc tham so
     * vmquang1 3.9.2022
     */
    setProfileInfo(state,doc){
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUsername = doc.data().username;
      console.log('setProfileInfo',state.profileId);
    },
    /**
     * Hàm set tên hiển thị
     * @param {*} state state
     * vmquang1 3.9.2022
     */
    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join("") + state.profileLastName.match(/(\b\S)?/g).join("");
        console.log('setProfileInitials',state.profileInitials);
    },
    /**
     * cập nhật thay đổi firtName
     * @param {*} state state
     * @param {*} payload data
     */
    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },
    /**
     * Cập nhạt thay đổi Lastname
     * @param {*} state state
     * @param {*} payload data
     */
    changeLastName(state, payload) {
      state.profileLastName = payload;
    },
    /**
     * cập nhật thay đổi username
     * @param {*} state state
     * @param {*} payload data
     */
    changeUsername(state, payload) {
      state.profileUsername = payload;
    },
    /**
     * check ADmin user
     * @param {*} state  state
     * @param {*} payload isAdmin
     */
    setProfileAdmin(state,payload){
      state.profileAdmin = payload;
    },
    filterBlogPost(state, payload) {
      state.blogPosts = state.blogPosts.filter((post) => post.blogID !== payload);
    },
  },
  getters:{
    blogPostsFeed(state){
      return state.blogPosts.slice(0,2)
    },
    blogPostsCards(state){
      return state.blogPosts.slice(2,6)
    }
  },
  actions: {
    async updatePost({ commit, dispatch }, payload) {
      commit("filterBlogPost", payload);
      await dispatch("getPost");
    },
    async deletePost({ commit }, payload) {
      const getPost = await db.collection("blogPosts").doc(payload);
      await getPost.delete();
      commit("filterBlogPost", payload);
    },
    async getPost({ state }) {
      const dataBase = await db.collection("blogPosts").orderBy("date", "desc");
      const dbResults = await dataBase.get();
      dbResults.forEach((doc) => {
        if (!state.blogPosts.some((post) => post.blogID === doc.id)) {
          const data = {
            blogID: doc.data().blogID,
            blogHTML: doc.data().blogHTML,
            blogCoverPhoto: doc.data().blogCoverPhoto,
            blogTitle: doc.data().blogTitle,
            blogDate: doc.data().date,
            blogCoverPhotoName: doc.data().blogCoverPhotoName,
          };
          state.blogPosts.push(data);
        }
      });
      state.postLoaded = true;
    },
    /**
     * Hàm lấy thông tin user
     * @param {*} param
     * vmquang1 3.9.2022
     */
    async getCurrentUser({commit},user){
      const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid);
      const dbResult = await dataBase.get();
      commit('setProfileInfo',dbResult);
      commit('setProfileInitials');
      console.log(user);
      // const token  = await user.getIdTokenResult();
      // const admin = await token.claim.admin;
      const isAdmin = true;
      commit('setProfileAdmin',isAdmin);


    },
    /**
     * hàm cập nhật data
     * @param {*} param0 
     */
    async updateUserSettings({ commit, state }) {
      const dataBase = await db.collection("users").doc(state.profileId);
      await dataBase.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        username: state.profileUsername,
      });
      commit("setProfileInitials");
    },
  },
  modules: {
  }
})
