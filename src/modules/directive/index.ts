import type { App } from "vue";

const modules = import.meta.glob("../../directives/**/index.ts", { eager: true });
export default (app: App) =>
	Object.values<any>(modules).forEach(item => item?.default && item?.default(app));
