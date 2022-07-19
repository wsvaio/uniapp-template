"use strict";
var utils_index = require("../../utils/index.js");
var common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    let title = common_vendor.ref("wdf");
    utils_index.EventBus.on("\u89E6\u53D1", () => {
      title.value = new Date().toLocaleString();
    });
    common_vendor.ref(0);
    return (_ctx, _cache) => {
      return {};
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Skywen-ws/Desktop/projects/uniapp-template/src/views/index/index.vue"]]);
wx.createPage(MiniProgramPage);
