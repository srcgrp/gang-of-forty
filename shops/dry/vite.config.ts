
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const api = { '/api': { target: 'https://gof.zzb.cx', changeOrigin: true} }

export default defineConfig({
    plugins: [react()],
    base: './',
    server: { proxy: api},
    preview: { proxy: api},
})