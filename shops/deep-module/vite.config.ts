import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const api = { "/api": { target: "https://gof.zzb.cx", changeOrigin: true } };

export default defineConfig({
  base: "./",
  plugins: [react()],
  server: { proxy: api },
  preview: { proxy: api },
});
