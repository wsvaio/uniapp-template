import { defineConfig } from "vite";

import plugins from "./presets/plugins";

import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins,

  resolve: {
    alias: {
      "@/": `${resolve(__dirname, 'src')}/`
    }
  },

  css: {



  }



});
