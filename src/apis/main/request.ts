import { createAPI } from "@wsvaio/uniapi";

const { VITE_BASE_API, DEV } = import.meta.env;

export const { get, use, post, put } = createAPI({
	log: DEV,
	baseURL: VITE_BASE_API,
	header: {
		version: "lwj",
	},
});

use("before")(async () => {
	console.log("before");
});
