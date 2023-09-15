import { setGlobalOptions } from "vue-request";

setGlobalOptions({
	pagination: {
		currentKey: "page",
		pageSizeKey: "limit",
		totalKey: "totalCount",
		totalPageKey: "totalPage",
	},
});
