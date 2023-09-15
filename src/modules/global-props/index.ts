import type { App } from "vue";

declare module "vue" {
	interface ComponentCustomProperties {
		$uni: Uni;
	}
}

export default (app: App) => {
	app.config.globalProperties.$uni = uni;
};
