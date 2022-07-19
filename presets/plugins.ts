import { PluginOption } from "vite";

import AutoImport from 'unplugin-auto-import/vite';
import uni from "@dcloudio/vite-plugin-uni";

import Components from 'unplugin-vue-components/vite';

import Unocss from "unocss/vite";
import { transformerDirectives, presetIcons, presetUno } from "unocss";

import { UnocssToUni } from 'vite-plugin-unocss-to-uni';

import sfcExtendTag from "./sfcExtendTag";
import importsListen, { imports } from "./autoImportConfigExtends";

import { resolve } from "path";



export default <PluginOption[]>[
  // 检查根<template>是否有tag属性 如果有则在原来的基础上添加这个tag标签包裹
  sfcExtendTag(),

  uni({
    vueOptions: {
      // 开启 vue $() 语法糖
      reactivityTransform: true,
    },
  }),

  // unocss 原子化css
  Unocss({
    presets: [
      // 兼容微信小程序预设
      presetUno(),
      presetIcons(),
    ],
    transformers: [
      // @apply 指令
      transformerDirectives({
        "enforce": "pre"
      }),
    ],
  }),
  UnocssToUni(),

  // api 自动引入
  AutoImport({
    dts: resolve(__dirname, 'typings/auto-import.d.ts'),
    imports: imports(
      "vue", "pinia", "@vueuse/core", "uni-app", "vitest",
      { target: "apis", prefix: "index.ts" },
      { target: "utils" },
      { target: "composables", prefix: "use" },
      { target: "stores", suffix: "Store" },
    ),
    resolvers: [

    ]
  }),
  // 自动引入的文件修改后重启服务器（auto-imports.d.ts才会更新）
  importsListen(),

  // 组件自动引入
  Components({
    dts: resolve(__dirname, 'typings/auto-components.d.ts'),
    resolvers: [

    ]
  }),


];