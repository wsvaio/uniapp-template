import { createSSRApp } from "vue";
import App from "./App.vue";

export const createApp = () => {
  const app = createSSRApp(App);
  const modules = import.meta.glob("./modules/*/index.ts", { eager: true });
  Object.values<any>(modules).forEach(item => item?.default && item?.default(app));
  return {
    app,
  };
};
