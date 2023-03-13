import { createPersistedState } from "pinia-plugin-persistedstate";
import type { App } from "vue";

const pinia = createPinia();
// pinia 持久化
pinia.use(createPersistedState());

export default (app: App) => {
  app.use(pinia);
};
