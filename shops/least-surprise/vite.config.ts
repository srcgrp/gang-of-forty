import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  server: {
    proxy: {
      '/api': {
        target: 'https://gof.zzb.cx',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/data')
      }
    }
  },
  preview: {
    proxy: {
      '/api': {
        target: 'https://gof.zzb.cx',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/data')
      }
    }
  }
})
