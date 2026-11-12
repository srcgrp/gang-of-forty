import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react";


// ../../api/products.json becomes /api/products.json on the dev server,
// so /api is proxied to the real Gang of Forty site.
const api = { '/api': { target: 'https://gof.zzb.cx', changeOrigin: true } }

export default defineConfig({
  plugins: [react()],
  base: './',
  server: { proxy: api },
  preview: { proxy: api },
})