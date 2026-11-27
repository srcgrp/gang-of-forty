import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import type { Connect, Plugin } from 'vite'

const apiDirectory = new URL('../../api/', import.meta.url)

function localApi(): Plugin {
  const middleware: Connect.NextHandleFunction = (request, response, next) => {
    const match = /^\/api\/([a-z-]+\.json)(?:\?.*)?$/.exec(request.url ?? '')
    if (!match) return next()
    readFile(new URL(match[1], apiDirectory)).then((body) => {
      response.setHeader('Content-Type', 'application/json; charset=utf-8')
      response.end(body)
    }).catch(next)
  }
  return {
    name: 'convention-local-api',
    configureServer(server) { server.middlewares.use(middleware) },
    configurePreviewServer(server) { server.middlewares.use(middleware) },
  }
}

const useFixtures = existsSync(new URL('products.json', apiDirectory))
const proxy = useFixtures ? undefined : {
  '/api/': { target: 'https://gof.zzb.cx', changeOrigin: true },
}

export default defineConfig({
  base: './',
  plugins: [react(), ...(useFixtures ? [localApi()] : [])],
  server: { proxy },
  preview: { proxy },
})
