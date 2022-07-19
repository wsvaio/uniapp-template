"use strict";
var apis_request = require("./request.js");
const { post, error, before, after } = apis_request.extendAPI();
before(async (ctx) => {
  console.log("before ---");
});
const test1 = post("/mock/test");
var $apis = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  test1
}, Symbol.toStringTag, { value: "Module" }));
exports.$apis = $apis;
