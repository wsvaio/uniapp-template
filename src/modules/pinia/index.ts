import persist from "@wsvaio/pinia-plugin-persist";
import type { App } from "vue";

export default (app: App) => {
	const pinia = createPinia();
	pinia.use(
		persist({
			getter: key => {
				return uni.getStorageSync(key);
			},
			setter: (key, value) => {
				uni.setStorageSync(key, value);
			},
		}),
	);

	app.use(pinia);
};
