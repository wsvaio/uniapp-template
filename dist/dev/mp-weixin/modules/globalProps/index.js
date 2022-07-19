"use strict";
var common_vendor = require("../../common/vendor.js");
var apis_index = require("../../apis/index.js");
var utils_index = require("../../utils/index.js");
var index = (app) => Object.assign(app.config.globalProperties, {
  $apis: apis_index.$apis,
  $uni: common_vendor.index,
  $utils: utils_index.$utils,
  $bus: utils_index.EventBus
});
var __glob_5_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": index
}, Symbol.toStringTag, { value: "Module" }));
exports.__glob_5_0 = __glob_5_0;
