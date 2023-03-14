import { createAPI } from "@wsvaio/uniapi";

const { DEV, VITE_BASE_API } = import.meta.env;
export const { get, use } = createAPI({
  log: DEV,
  baseURL: DEV ? "" : VITE_BASE_API,
});

use("befores")(async (ctx) => {
  console.log("befores", { ...ctx });
});
