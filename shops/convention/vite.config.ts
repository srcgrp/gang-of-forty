import { defineConfig } from 'vite'
import type { Connect, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { readFile } from 'node:fs/promises'

// Local development and preview use the repository's shared, read-only API fixtures.
function localApi(): Plugin {
  const middleware: Connect.NextHandleFunction =
    (req, res, next) => {
      const match = /^\/api\/([a-z-]+\.json)(?:\?.*)?$/.exec(req.url ?? '')
      if (!match) return next()
      readFile(new URL(`../../api/${match[1]}`, import.meta.url), 'utf8').then((body) => {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.end(body)
      }).catch(() => next())
    }
  return {
    name: 'convention-local-api',
    configureServer(server) { server.middlewares.use(middleware) },
    configurePreviewServer(server) { server.middlewares.use(middleware) },
  }
}

export default defineConfig({ base: './', plugins: [react(), localApi()] })
