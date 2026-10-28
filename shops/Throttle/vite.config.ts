import { defineConfig } from 'vite'

const api = { '/api': { target: 'https://gof.zzb.cx', changeOrigin: true } }

export default defineConfig({
  base: './',
  server: { proxy: api },
  preview: { proxy: api },
})
