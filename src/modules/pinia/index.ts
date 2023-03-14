import type { App } from "vue";
import { pick } from "@wsvaio/utils";
import persist from "@wsvaio/pinia-plugin-persist";
const pinia = createPinia();

pinia.use(persist({
  setter(key, paths, state) {
    uni.setStorageSync(key, pick(state, paths));
  },
  getter(key) {
    return uni.getStorageSync(key);
  },
}));

export default (app: App) => app.use(pinia);
