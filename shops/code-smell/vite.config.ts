import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

const apiProxy = {
    "/api": {
        target: "https://gof.zzb.cx",
        changeOrigin: true
    }
}

export default defineConfig({
    plugins: [react()],
    base: "./",
    server: {
        proxy: apiProxy
    },
    preview: {
        proxy: apiProxy
    }
})