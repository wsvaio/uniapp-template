import { defineStore } from "pinia";
// const storageName = `${import.meta.env.VITE_PROJECT_NAME}_auth`;

export default defineStore("auth", {
  state: () => ({
    token: "",
  }),
  actions: {
    async login() {
      console.log("login");
    },

    logout() {
      this.$reset();
    },
  },
  getters: {
    isLogin(): boolean {
      return !!this.token;
    },
  },

  // persist: {
  //   key: storageName,
  //   storage: localStorage,
  // },
});
