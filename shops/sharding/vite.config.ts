import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://gof.zzb.cx',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  preview: {
    proxy: {
      '/api': {
        target: 'https://gof.zzb.cx',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})