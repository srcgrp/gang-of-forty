import {defineConfig} from 'vite'

const api = {'/api': {target: 'https://gof.zzb.cx', changeOrigin: true}}

export default defineConfig(({mode}) => {
    const proxy = mode === 'mine' ? undefined : api
    return {
        base: '',
        server: { proxy },
        preview: { proxy },
    }
})
