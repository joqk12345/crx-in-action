import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { CRX_BACKGROUND_OUTDIR } from './globalConfig'

export default defineConfig({
  build: {
    // 输出目录
    outDir: CRX_BACKGROUND_OUTDIR,
    lib: {
      entry: [path.resolve(__dirname, 'src/background/background.ts')],
      // background script不支持ES6，因此不用使用es模式，需要改为cjs模式
      formats: ['cjs'],
      // 设置生成文件的文件名
      fileName: () => {
        return 'background.js'
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
