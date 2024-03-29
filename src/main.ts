import { createSSRApp } from "vue";
import App from "./App.vue";

const modules = import.meta.glob("./modules/*/index.ts", { eager: true });
export function createApp() {
	const app = createSSRApp(App);

	Object.values<any>(modules).forEach(item => item?.default && item?.default(app));
	return {
		app,
	};
}
