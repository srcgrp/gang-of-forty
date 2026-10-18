import { defineConfig } from 'vite';

const apiProxy = {
  '/api': {
    target: 'https://gof.zzb.cx',
    changeOrigin: true,
    secure: true,
  },
};

export default defineConfig({
  base: './',
  server: { proxy: apiProxy },
  preview: { proxy: apiProxy },
});
