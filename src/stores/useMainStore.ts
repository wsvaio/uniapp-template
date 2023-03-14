import { defineStore } from "pinia";

export default defineStore("main", {
  state: () => ({
    count: 0,
    map: new Map([["1", "2"]]),
  }),
  actions: {},
  getters: {},
  persist: {
  },
});
