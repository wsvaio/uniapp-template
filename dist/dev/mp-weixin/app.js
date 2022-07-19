"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
var modules_globalProps_index = require("./modules/globalProps/index.js");
var modules_pinia_index = require("./modules/pinia/index.js");
var modules_styles_index = require("./modules/styles/index.js");
var common_vendor = require("./common/vendor.js");
require("./apis/index.js");
require("./apis/request.js");
require("./apis/createAPI.js");
require("./utils/index.js");
if (!Math) {
  "./views/index/index.js";
  "./views/about/index.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "App",
  setup(__props) {
    common_vendor.onLaunch(() => {
      console.log("App Launch");
    });
    common_vendor.onShow(() => {
      console.log("App Show");
    });
    common_vendor.onHide(() => {
      console.log("App Hide");
    });
    return () => {
    };
  }
});
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Skywen-ws/Desktop/projects/uniapp-template/src/App.vue"]]);
const modules = { "./modules/globalProps/index.ts": modules_globalProps_index.__glob_5_0, "./modules/pinia/index.ts": modules_pinia_index.__glob_5_1, "./modules/styles/index.ts": modules_styles_index.__glob_5_2 };
function createApp() {
  const app = common_vendor.createSSRApp(App);
  Object.values(modules).forEach((module) => module.default && module.default(app));
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
