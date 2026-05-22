import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

function normalizeBasePath(path = '/dashboard/') {
  const prefixed = path.startsWith('/') ? path : `/${path}`
  return prefixed.endsWith('/') ? prefixed : `${prefixed}/`
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiProxyTarget = env.VITE_API_PROXY_TARGET

  return {
    base: normalizeBasePath(env.VITE_BASE_PATH),
    server: {
      port: 5174,
      proxy: apiProxyTarget
        ? {
            '/backend': {
              target: apiProxyTarget,
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/backend/, '') || '/',
              secure: false,
            },
          }
        : undefined,
    },
    plugins: [react(), tailwindcss()],
  }
})
