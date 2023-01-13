import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      // 这里的 @ 就是我们要为 src 配置的别名
    }
  }
})
