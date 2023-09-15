declare global {
	interface ImportMetaEnv {
		readonly VITE_BASE: string;
		readonly VITE_BASE_API: string;
	}
}

declare module "vue" {
	export interface GlobalComponents {}
}





export {};
