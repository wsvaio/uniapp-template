import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import scriptAttrs from "vite-plugin-vue-script-attrs";
import templateTag from "vite-plugin-vue-template-tag";
import Unocss from "unocss/vite";
import presetWeapp from "unocss-preset-weapp";
import { transformerAttributify, transformerClass } from "unocss-preset-weapp/transformer";
export default defineConfig(({ mode }) => {
  const { VITE_BASE } = loadEnv(mode, "./");
  return {
    base: VITE_BASE,
    resolve: {
      alias: {
        "@/": `${resolve(__dirname, "src")}/`,
        "#/": `${resolve(__dirname, "types")}/`,
      },
    },
    plugins: [
      uni({
        vueOptions: {
          reactivityTransform: true,
        },
      }),
      Unocss({
        presets: [presetWeapp()],
        transformers: [transformerAttributify(), transformerClass()],
      }),
      scriptAttrs({
        attrNames: ["name", "inheritAttrs"],
      }),
      templateTag(),
      AutoImport({
        dts: resolve(__dirname, "types/auto-import.d.ts"),
        imports: ["pinia", "uni-app"],
        vueTemplate: true,
        defaultExportByFilename: true,
        dirs: ["src/utils", "src/composables", "src/stores", "src/apis/index*"],
      }),
      Components({
        dts: resolve(__dirname, "types/auto-components.d.ts"),
        globs: ["src/components/*/index.vue", "src/layouts/*/index.vue"],
      }),
    ],
  };
});
