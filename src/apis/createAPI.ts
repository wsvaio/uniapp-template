import { rejects } from "assert";
import { merge, dateFormat, createCompose, middleware, plugins, toString, trying, } from "wsvaio";

// 总环境类型 custom: 自定义属性 params: body query param 的类型
export type ctx<custom = {}, params = {}> = {
  log?: boolean, // 是否控制台打印日志
  timeout?: number, // 超时中断的时间
  url?: string, // 请求地址
  baseURL?: string, // 根地址
  body?: Partial<params> & { [k: string]: any; } | string, // 请求体
  query?: Partial<params> & { [k: string]: any; }, // 请求search参数
  param?: Partial<params> & { [k: string]: any; }, // 请求参数
  error?: Partial<Error & ctx<custom, params>>, // 错误
  data?: any, // 响应结果
  message?: string, // 响应消息
  status?: number, // 状态码
  response?: { [k: string]: any; },
} & Omit<RequestInit, "body"> & custom; // RequestInit fetch配置 custom 自定义配置




// 发送请求，核心中间件
async function middle(ctx) {
  // 删除get或head的请求体（这些方法不允许设置请求体）否则格式化请求体为json

  ctx.response = await new Promise((resolve, reject) => {
    uni.request({
      header: ctx.headers,
      method: ctx.method,
      timeout: ctx.timeout,
      url: ctx.baseURL + ctx.url,
      data: ["get", "delete"].includes(ctx.method.toLowerCase()) ? ctx.query : ctx.body,
      success: data => resolve(data),
      fail: error => reject(error),
    });
  });
}

export function createAPI<custom = any>(_ctx = <ctx<custom>>{}, ...plugins: plugins<ctx<custom>>) {

  const { error, final, run, useList, errorList, finalList, plugin } = createCompose<ctx<custom>>();

  if (plugins.length != 0) plugin(...plugins);
  else {
    // 合并全局与局部配置
    useList.push(async ctx => merge(ctx, _ctx, Infinity));

    // 初始化headers
    useList.push(async ctx => ctx.headers || (ctx.headers = {}));

    // 添加Content-Type（应为要转换为JSON，fetch默认对字符串设置为text/plain）
    useList.push(async ctx => {
      if (toString(ctx.body) != "[object Object]" && toString(ctx.body) != "[object Array]") return;
      ctx.headers || (ctx.headers = {});
      ctx.headers["Content-Type"] = "application/json;charset=UTF-8";
    });

    // 拼接请求url
    useList.push(async ctx => {
      let { query, param, url = "" } = ctx;
      if (param) for (let [k, v] of Object.entries<any>(param)) url = url.replace(`:${k}`, v);
      if (query) {
        url += "?";
        for (let [k, v] of Object.entries<any>(query)) url += `${k}=${v}`;
      }
      ctx.url = url;
    });

    // ************************************* 发送请求（核心中间件，命名为 middle， 所有前置都在此之前，后置都在此之后）*************************************
    useList.push(middle);

    // 格式化结果
    useList.push(async ctx => {
      if (!ctx.response) return;
      Object.assign(ctx, {
        data: ctx.response.data,
        status: ctx.response.statusCode
      });
      ctx.message = `${ctx.response.errMsg} status:${ctx.response.statusCode}`;
      ctx.response.ok = ctx.response.statusCode >= 200 && ctx.response.statusCode < 300;
      ctx.response.ok || Promise.reject(ctx);
    });

    // 错误处理
    error(async (ctx, next) => {
      ctx.message = ctx.error?.message;
      await next();
      // 总会抛出错误
      return Promise.reject(ctx);
    });


    // 打印日志
    final(async ctx => {
      if (!ctx.log) return;

      ctx.response || (ctx.response = { ok: false, statusCode: 400, errMsg: "request:fail" });
      ctx.data || (ctx.data = { message: ctx.message });
      ctx.body || (ctx.body = {});

      let data = ctx.data;
      Array.isArray(ctx.data) && (data = { data });
      Object.setPrototypeOf(data, new function result() { });
      Object.setPrototypeOf(ctx.body, new function params() { });
      Object.setPrototypeOf(ctx, new function context() { });
      console.groupCollapsed(`%c ${dateFormat(String(new Date()))} %c ${ctx.method} %c ${ctx.url} %c ${ctx.response.statusCode} ${ctx.response.errMsg} `,
        "font-size: 16px; font-weight: 100; color: white; background: #909399; border-radius: 3px 0 0 3px;",
        "font-size: 16px; font-weight: 100; color: white; background: #E6A23C;",
        "font-size: 16px; font-weight: 100; color: white; background: #409EFF;",
        `font-size: 16px; font-weight: 100; color: white; background: ${ctx.response.ok ? '#67C23A' : '#F56C6C'}; border-radius: 0 3px 3px 0;`,
      );
      console.log(ctx.body);
      console.log(data);
      console.log(ctx);
      console.groupEnd();
    });

  }



  // 泛型 params：body param query的可能包含的参数，data：请求响应的类型
  function fn<params = any, data = any>(url: string, method: string) {
    return async (ctx = <ctx<Partial<custom>, params>>{}) => {
      Object.assign(ctx, { url, method });
      return <data>(await run(<ctx<custom>>ctx)).data;
    };
  }



  return {


    error, final,
    extendAPI: <T = {}>(ctx = <ctx<Partial<custom> & T>>{}) => createAPI<custom & T>(merge(ctx, _ctx, Infinity), { useList, errorList, finalList }),

    before: (...middleware: middleware<ctx<custom>>[]) => {
      const index = useList.indexOf(middle);
      useList.splice(index, 0, ...middleware);
    },
    after: (...middleware: middleware<ctx<custom>>[]) => useList.push(...middleware),

    get: <params = any, data = any>(url: string) => fn<params, data>(url, "get"),
    post: <params = any, data = any>(url: string) => fn<params, data>(url, "post"),
    put: <params = any, data = any>(url: string) => fn<params, data>(url, "put"),
    patch: <params = any, data = any>(url: string) => fn<params, data>(url, "patch"),
    del: <params = any, data = any>(url: string) => fn<params, data>(url, "delete"),
    request: async <params = any, data = any>(ctx: ctx<custom, params>) => <data>(await run(ctx)).data,
  };


}