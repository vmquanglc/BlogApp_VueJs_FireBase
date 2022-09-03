<template>
  <div class="profile">
    <Modal
      v-if="modalActive"
      :modalMessage="modalMessage"
      v-on:close-modal="closeModal"
    />
    <div class="container">
      <h2>{{ i18n.Common.AccountSettings }}</h2>
      <div class="profile-info">
        <div class="initials">{{ $store.state.profileInitials }}</div>
        <div v-if="isAdmin" class="admin-badge">
          <adminIcon class="icon" />
          <span>{{ i18n.Common.Admin }}</span>
        </div>
        <div class="input">
          <div class="title-input">
            <div class="right">
              <label for="firstName">{{ i18n.FieldName.FirstName }}</label>
              <div class="">*</div>
            </div>
            <div class="left">{{ errorFirstName }}</div>
          </div>
          <input type="text" id="firstName" v-model="firstName" />
        </div>
        <div class="input">
          <div class="title-input">
            <div class="right">
              <label for="lastName">{{ i18n.FieldName.LastName }}</label>

              <div class="">*</div>
            </div>
            <div class="left">{{ errorLastName }}</div>
          </div>
          <input type="text" id="lastName" v-model="lastName" />
        </div>
        <div class="input">
          <div class="title-input">
            <div class="right">
              <label for="username">{{ i18n.FieldName.Username }}</label>
              <div class="">*</div>
            </div>
            <div class="left">{{ errorUsername }}</div>
          </div>
          <input type="text" id="username" v-model="username" />
        </div>
        <div class="input">
          <div class="title-input">
            <div class="right">
              <label for="email">{{ i18n.FieldName.Email }}</label>
              <div class="">*</div>
            </div>
            <div class="left">{{ errorEmail }}</div>
          </div>
          <input disabled type="text" id="email" v-model="email" />
        </div>
        <button @click="updateProfile">{{ i18n.Button.SaveChanges }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "../components/Modal";
import adminIcon from "../assets/Icons/user-crown-light.svg";
import i18n from "../i18n/resource.js";
export default {
  name: "Profile",
  components: {
    Modal,
    adminIcon,
  },
  data() {
    return {
      i18n,
      //msg khi save success
      modalMessage: "Changes were saved!",
      //cờ ẩn-hiện modal
      modalActive: false,
      errorFirstName: "",
      errorLastName: "",
      errorUsername: "",
      errorEmail: "",
    };
  },
  watch: {
    firstName(newVal) {
      if (!newVal || newVal.length == 0) {
        this.errorFirstName = this.i18n.Error.CantEmpty;
        return;
      }
      this.errorFirstName = "";
      return;
    },
    lastName(newVal) {
      if (!newVal || newVal.length == 0) {
        this.errorLastName = this.i18n.Error.CantEmpty;
        return;
      }
      this.errorLastName = "";
      return;
    },
    username(newVal) {
      if (!newVal || newVal.length == 0) {
        this.errorUsername = this.i18n.Error.CantEmpty;
        return;
      }
      this.errorUsername = "";
      return;
    },
    email(newVal) {
      if (!newVal || newVal.length == 0) {
        this.errorEmail = this.i18n.Error.CantEmpty;
        return;
      }
      this.errorEmail = "";
      return;
    },
  },
  methods: {
    invalidData() {
      return (
        this.errorEmail != "" ||
        this.errorUsername != "" ||
        this.errorLastName != "" ||
        this.errorFirstName != ""
      );
    },
    /**
     * event click btn update profile
     */
    updateProfile() {
      if (this.invalidData()) {
        return;
      }
      this.$store.dispatch("updateUserSettings");
      this.modalActive = !this.modalActive;
    },
    /**
     * Event đóng modal
     * vmquang1 3.9.2022
     */
    closeModal() {
      this.modalActive = !this.modalActive;
    },
  },
  computed: {
    isAdmin() {
      return this.$store.state.profileAdmin;
    },
    firstName: {
      get() {
        return this.$store.state.profileFirstName;
      },
      set(payload) {
        this.$store.commit("changeFirstName", payload);
      },
    },
    lastName: {
      get() {
        return this.$store.state.profileLastName;
      },
      set(payload) {
        this.$store.commit("changeLastName", payload);
      },
    },
    username: {
      get() {
        return this.$store.state.profileUsername;
      },
      set(payload) {
        this.$store.commit("changeUsername", payload);
      },
    },
    email() {
      return this.$store.state.profileEmail;
    },
  },
};
</script>
<style lang="scss" scoped>
.profile {
  .container {
    max-width: 1000px;
    padding: 60px 25px;

    h2 {
      text-align: center;
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }

    .profile-info {
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 32px;
      background-color: #f1f1f1;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 32px auto;

      .initials {
        position: initial;
        width: 80px;
        height: 80px;
        font-size: 32px;
        background-color: #303030;
        color: #fff;
        display: flex;
        align-self: center;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }

      .admin-badge {
        display: flex;
        align-self: center;
        color: #fff;
        font-size: 14px;
        padding: 8px 24px;
        border-radius: 8px;
        background-color: #303030;
        margin: 16px 0;
        text-align: center;
        text-transform: capitalize;

        .icon {
          width: 14px;
          height: auto;
          margin-right: 8px;
        }
      }

      .input {
        margin: 16px 0;

        label {
          font-size: 14px;
          display: block;
          padding-bottom: 6px;
        }
        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 8px;
          height: 50px;
          @media (min-width: 900px) {
          }

          &:focus {
            outline: none;
          }
        }
      }

      button {
        align-self: center;
      }
    }
  }
}
</style>