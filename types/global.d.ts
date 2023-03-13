import { ComponentOptions } from "vue";

// declare module "vue" {
//   interface GlobalComponents {
//     // component: ComponentOptions;
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

export {};
