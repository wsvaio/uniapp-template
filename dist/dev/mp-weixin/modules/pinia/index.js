"use strict";
var common_vendor = require("../../common/vendor.js");
const pinia = common_vendor.createPinia();
pinia.use(common_vendor.index$1);
var index = (app) => app.use(pinia);
var __glob_5_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": index
}, Symbol.toStringTag, { value: "Module" }));
exports.__glob_5_1 = __glob_5_1;
