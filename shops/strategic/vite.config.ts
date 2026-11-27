import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

const apiProxy = {
  '/api': {
    target: 'https://gof.zzb.cx',
    changeOrigin: true,
    secure: true,
  },
};

export default defineConfig(({ mode }) => ({
  base: './',
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify(
      loadEnv(mode, '.', 'VITE_').VITE_API_URL ?? (mode === 'production' ? '../../api' : '/api'),
    ),
  },
  plugins: [react()],
  server: { proxy: apiProxy },
  preview: { proxy: apiProxy },
}));