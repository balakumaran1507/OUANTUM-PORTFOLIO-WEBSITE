import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const ENV_KEYS = [
  'GROQ_API_KEY',
  'TELEGRAM_BOT_TOKEN',
  'TELEGRAM_CHAT_ID',
  'TELEGRAM_CHAT_ID_2',
]

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env }
  const define: Record<string, string> = {}
  for (const key of ENV_KEYS) {
    const value = env[`VITE_${key}`] || env[key]
    define[`import.meta.env.VITE_${key}`] = value ? JSON.stringify(value) : 'undefined'
  }

  return {
  define,
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    },
  },
  optimizeDeps: {
    include: ['metal-fx'],
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/react-router-dom/')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/framer-motion/')) {
            return 'vendor-framer';
          }
          if (id.includes('node_modules/lucide-react/')) {
            return 'vendor-lucide';
          }
        },
      },
    },
  },
}
})
