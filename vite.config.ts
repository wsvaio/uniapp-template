import { resolve } from "node:path";
import { defineConfig, loadEnv } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import Unocss from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const { VITE_BASE } = loadEnv(mode, "./");

	return {
		base: VITE_BASE,
		resolve: {
			alias: {
				"@/": `${resolve(__dirname, "src")}/`,
			},
		},
		build: {
			target: "es6",
			cssTarget: "chrome61", // https://cn.vitejs.dev/config/build-options.html#build-csstarget
		},
		optimizeDeps: {
			exclude: ["vue-demi"],
		},
		plugins: [
			uni({
				vueOptions: {
					reactivityTransform: true,
				},
			}),
			Unocss(),
			AutoImport({
				dts: resolve(__dirname, "types/auto-import.d.ts"),
				imports: [
					"pinia",
					"vue",
					"uni-app",
					// "@vueuse/core", UniUseAutoImports
				],
				vueTemplate: true,
				defaultExportByFilename: true,
				dirs: ["src/utils/index*", "src/stores", "src/apis/*/index*", "src/composables"],
			}),
			Components({
				dts: resolve(__dirname, "types/auto-components.d.ts"),
				globs: ["src/components/*/index.vue", "src/layouts/*/index.vue"],
			}),
			// mode == "development"
			// 	? ImageHelper({
			// 		path: "@/assets/img",
			// 		// port: 8848,
			// 	  })
			// 	: undefined,
		],
	};
});
