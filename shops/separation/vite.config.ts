import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  server: {
    proxy: {
      '/api': {
        target: 'https://gof.zzb.cx',
        changeOrigin: true,
      },
    },
  },
})
