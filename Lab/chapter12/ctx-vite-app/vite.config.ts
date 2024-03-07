import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { CRX_OUTDIR } from './globalConfig.ts'
export default defineConfig({
  server: {
    port: 3000,
    open: '/',
  },
  build: {
    outDir: CRX_OUTDIR,
    rollupOptions: {
      input: {
        popup: path.resolve(__dirname, 'index.html'),
        options: path.resolve(__dirname, 'options.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [vue()],
})
