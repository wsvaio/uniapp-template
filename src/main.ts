import { createSSRApp } from "vue";
import App from "./App.vue";

const modules = import.meta.globEager('./modules/*/index.ts');

export function createApp() {

  const app = createSSRApp(App);
  Object.values(modules).forEach(module => module.default && module.default(app));
  return {
    app,
  };
}
