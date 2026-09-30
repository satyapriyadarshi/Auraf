import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api/verify-product': {
        target: 'https://satyapriyadarshi-87.app.n8n.cloud',
        changeOrigin: true,
        rewrite: () => '/webhook/grade-produce',
      },
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
