
import { createAPI } from "@/apis/createAPI";

const { DEV, VITE_BASE_API } = import.meta.env;
// 创建api对象 泛型添加自定义属性
export const api = createAPI<{ success?: string; headers: Record<string, string>; }>({
  // baseURL: DEV ? "" : VITE_BASE_API,
  baseURL: "http://localhost:3000",
  log: DEV, // 控制台是否打印日志
  timeout: 0,
  headers: {

  },


});
export const { post, get, put, patch, del, request, error, final, before, after, extendAPI } = api;

// 请求发出前
// api.before(async ctx => Progress.start());



// 结束时总会运行
// 进度条结束
// api.final(async ctx => ctx.error ? Progress.done(false) : Progress.done());
// notice 通知 不设置success则不会通知
// api.final(async ctx => ctx.error ? ElNotification.error(ctx.message) : ctx.success != undefined && ElNotification.success(ctx.success || ctx.message));

