"use strict";
var apis_createAPI = require("./createAPI.js");
const { DEV, VITE_BASE_API } = { "VITE_ROOT_DIR": "C:\\Users\\Skywen-ws\\Desktop\\projects\\uniapp-template", "VITE_USER_NODE_ENV": "development", "VITE_PROJECT_NAME": "ws", "VITE_BASE_API": "", "BASE_URL": "/", "MODE": "development", "DEV": true, "PROD": false };
const api = apis_createAPI.createAPI({
  baseURL: "http://localhost:3000",
  log: DEV,
  timeout: 0,
  headers: {}
});
const { post, get, put, patch, del, request, error, final, before, after, extendAPI } = api;
exports.extendAPI = extendAPI;
