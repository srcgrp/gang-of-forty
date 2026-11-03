import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'https://gof.zzb.cx',
                changeOrigin: true
            }
        }
    }
});
