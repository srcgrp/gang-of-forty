import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const api = { '/api': { target: 'https://gof.zzb.cx', changeOrigin: true } }

export default defineConfig(({ mode }) => {
    const proxy = mode === 'mine' ? undefined : api
    return {
        plugins: [react()],
        base: './',
        server: { proxy },
        preview: { proxy },
    }
})