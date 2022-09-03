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
    editPost:false,
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
  },
  actions: {
    /**
     * Hàm lấy thông tin user
     * @param {*} param
     * vmquang1 3.9.2022
     */
    async getCurrentUser({commit}){
      const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid);
      const dbResult = await dataBase.get();
      commit('setProfileInfo',dbResult);
      commit('setProfileInitials');
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
