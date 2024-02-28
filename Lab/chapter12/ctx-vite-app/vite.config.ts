import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path,{ resolve } from 'path'
import {CRX_OUTDIR} from './globalConfig'
export default defineConfig({
    server:{
        port:3000,
        open:"/",
    },
    build:{
        outDir:CRX_OUTDIR,
        rollupOptions:{
            input:{
                popup:resolve(__dirname,'index.html'),
            }
        }
    },
    resolve:{
        alias:{
            '@':path.resolve(__dirname,'src'),
        },
    },
    plugins: [vue()],
})
