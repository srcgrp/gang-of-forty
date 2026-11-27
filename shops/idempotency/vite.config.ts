import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
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