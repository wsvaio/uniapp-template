import { defineStore } from "pinia";
const storageName = `${import.meta.env.VITE_PROJECT_NAME}_token`;


export default defineStore("main", {
  state() {
    return {
      ws: "Hello"

    };
  },
  actions: {



  },
  getters: {

  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: storageName,
        storage: localStorage,
      }
    ]
  }
});