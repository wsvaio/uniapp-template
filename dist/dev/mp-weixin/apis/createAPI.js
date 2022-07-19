"use strict";
var common_vendor = require("../common/vendor.js");
async function middle(ctx) {
  ctx.response = await new Promise((resolve, reject) => {
    common_vendor.index.request({
      header: ctx.headers,
      method: ctx.method,
      timeout: ctx.timeout,
      url: ctx.baseURL + ctx.url,
      data: ["get", "delete"].includes(ctx.method.toLowerCase()) ? ctx.query : ctx.body,
      success: (data) => resolve(data),
      fail: (error) => reject(error)
    });
  });
}
function createAPI(_ctx = {}, ...plugins2) {
  const { error, final, run, useList, errorList, finalList, plugin } = common_vendor.createCompose();
  if (plugins2.length != 0)
    plugin(...plugins2);
  else {
    useList.push(async (ctx) => common_vendor.merge(ctx, _ctx, Infinity));
    useList.push(async (ctx) => ctx.headers || (ctx.headers = {}));
    useList.push(async (ctx) => {
      if (common_vendor.toString(ctx.body) != "[object Object]" && common_vendor.toString(ctx.body) != "[object Array]")
        return;
      ctx.headers || (ctx.headers = {});
      ctx.headers["Content-Type"] = "application/json;charset=UTF-8";
    });
    useList.push(async (ctx) => {
      let { query, param, url = "" } = ctx;
      if (param)
        for (let [k, v] of Object.entries(param))
          url = url.replace(`:${k}`, v);
      if (query) {
        url += "?";
        for (let [k, v] of Object.entries(query))
          url += `${k}=${v}`;
      }
      ctx.url = url;
    });
    useList.push(middle);
    useList.push(async (ctx) => {
      if (!ctx.response)
        return;
      Object.assign(ctx, {
        data: ctx.response.data,
        status: ctx.response.statusCode
      });
      ctx.message = `${ctx.response.errMsg} status:${ctx.response.statusCode}`;
      ctx.response.ok = ctx.response.statusCode >= 200 && ctx.response.statusCode < 300;
      ctx.response.ok || Promise.reject(ctx);
    });
    error(async (ctx, next) => {
      var _a;
      ctx.message = (_a = ctx.error) == null ? void 0 : _a.message;
      await next();
      return Promise.reject(ctx);
    });
    final(async (ctx) => {
      if (!ctx.log)
        return;
      ctx.response || (ctx.response = { ok: false, statusCode: 400, errMsg: "request:fail" });
      ctx.data || (ctx.data = { message: ctx.message });
      ctx.body || (ctx.body = {});
      let data = ctx.data;
      Array.isArray(ctx.data) && (data = { data });
      Object.setPrototypeOf(data, new function result() {
      }());
      Object.setPrototypeOf(ctx.body, new function params() {
      }());
      Object.setPrototypeOf(ctx, new function context() {
      }());
      console.groupCollapsed(`%c ${common_vendor.dateFormat(String(new Date()))} %c ${ctx.method} %c ${ctx.url} %c ${ctx.response.statusCode} ${ctx.response.errMsg} `, "font-size: 16px; font-weight: 100; color: white; background: #909399; border-radius: 3px 0 0 3px;", "font-size: 16px; font-weight: 100; color: white; background: #E6A23C;", "font-size: 16px; font-weight: 100; color: white; background: #409EFF;", `font-size: 16px; font-weight: 100; color: white; background: ${ctx.response.ok ? "#67C23A" : "#F56C6C"}; border-radius: 0 3px 3px 0;`);
      console.log(ctx.body);
      console.log(data);
      console.log(ctx);
      console.groupEnd();
    });
  }
  function fn(url, method) {
    return async (ctx = {}) => {
      Object.assign(ctx, { url, method });
      return (await run(ctx)).data;
    };
  }
  return {
    error,
    final,
    extendAPI: (ctx = {}) => createAPI(common_vendor.merge(ctx, _ctx, Infinity), { useList, errorList, finalList }),
    before: (...middleware2) => {
      const index = useList.indexOf(middle);
      useList.splice(index, 0, ...middleware2);
    },
    after: (...middleware2) => useList.push(...middleware2),
    get: (url) => fn(url, "get"),
    post: (url) => fn(url, "post"),
    put: (url) => fn(url, "put"),
    patch: (url) => fn(url, "patch"),
    del: (url) => fn(url, "delete"),
    request: async (ctx) => (await run(ctx)).data
  };
}
exports.createAPI = createAPI;
