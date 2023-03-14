import type { App } from "vue";
import persist from "@wsvaio/pinia-plugin-persist";
const pinia = createPinia();

// pinia.use(({ store, options: { persist } }) => {
//   if (!persist) return;
//   const result = uni.getStorageSync(persist.key);
//   const set = () =>
//     uni.setStorageSync(
//       persist.key,
//       persist.paths ? pick(store.$state, persist.paths) : store.$state,
//     );

//   result ? store.$patch(result) : set();
//   store.$subscribe(set);
//   store.$subscribe(() => console.log("sdklfjalsdjf;lajsdlfjalskdjflaksdjflkj"));
// });

pinia.use(persist({
  key: "123123",
}));

export default (app: App) => {
  app.use(pinia);
};
