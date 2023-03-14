import { ComponentOptions } from "vue";

// declare module "vue" {
//   interface GlobalComponents {
//     // component: ComponentOptions;
//   }
// }

// declare module "pinia" {
//   export interface DefineStoreOptionsBase<S, Store> {
//     // 允许为任何操作定义毫秒数
//     persist?: {
//       key: string,
//       paths?: string[],
//     }
//   }
// }

declare module "vue-router" {
  interface RouteMeta {
    title?: string;
    icon?: ComponentOptions;
  }
}

declare global {
  interface ImportMetaEnv {
    readonly VITE_PROJECT_NAME: string;
    readonly VITE_DOCUMENT_TITLE: string;
    readonly VITE_BASE: string;
    readonly VITE_BASE_API: string;
    readonly VITE_GAODE_WEBAPI_KEY: string;
  }

  type Writeable<T> = {
    -readonly [K in keyof T]: T[K];
  };
}

interface IntrinsicElementAttributes {}

export {};
