import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

function normalizeBasePath(path = '/dashboard/') {
  const prefixed = path.startsWith('/') ? path : `/${path}`
  return prefixed.endsWith('/') ? prefixed : `${prefixed}/`
}

export default defineConfig({
  base: normalizeBasePath(process.env.VITE_BASE_PATH),
  server: {
    port: 5174,
  },
  plugins: [react()],
})
