import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  server: {
    proxy: {
      "/api": {
        target: "https://gof.zzb.cx",
        changeOrigin: true,
      },
    },
  },
  preview: {
    proxy: {
      "/api": {
        target: "https://gof.zzb.cx",
        changeOrigin: true,
      },
    },
  },
});