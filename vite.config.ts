import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: {
        tsconfigPath: './tsconfig.json',
        root: './',
      },
      enableBuild: true,
      overlay: true,
      terminal: true
    }),
  ],
  resolve: {
    alias: {
      src: "/src",
      assets: "/src/assets",
      common: "/src/common",
      components: "/src/components",
      layouts: "/src/layouts",
      pages: "/src/pages",
      utils: "/src/utils",
    },
  },
})
