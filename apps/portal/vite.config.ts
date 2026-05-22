import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

function normalizeBasePath(path = '/') {
  const prefixed = path.startsWith('/') ? path : `/${path}`
  return prefixed.endsWith('/') ? prefixed : `${prefixed}/`
}

function shouldRewriteBackendProxy(target: string) {
  try {
    const { hostname } = new URL(target)

    return hostname === 'localhost' || hostname === '127.0.0.1'
  } catch {
    return false
  }
}

function createBackendProxy(target: string) {
  return {
    target,
    changeOrigin: true,
    rewrite: shouldRewriteBackendProxy(target)
      ? (path: string) => path.replace(/^\/backend/, '') || '/'
      : undefined,
    secure: false,
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiProxyTarget = env.VITE_API_PROXY_TARGET

  return {
    base: normalizeBasePath(env.VITE_BASE_PATH),
    server: {
      proxy: apiProxyTarget
        ? {
            '/backend': createBackendProxy(apiProxyTarget),
          }
        : undefined,
    },
    plugins: [react(), tailwindcss()],
  }
})
