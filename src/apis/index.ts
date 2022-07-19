import { extendAPI } from "@/apis/request";

const { post, error, before, after } = extendAPI();


before(async ctx => {

  console.log("before ---");
});


export const test1 = post("/mock/test");