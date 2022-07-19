import { App } from "vue";
import * as $apis from "@/apis";
import * as $utils from "@/utils";

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $apis: typeof $apis;
    $utils: typeof $utils;
    $bus: typeof $utils.EventBus;
    $uni: UniApp.Uni;
  }
}

export default (app: App) => Object.assign(app.config.globalProperties, {
  $apis,
  $uni: uni,
  $utils,
  $bus: $utils.EventBus,
});

