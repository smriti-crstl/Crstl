import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';
import svgr from '@svgr/rollup';
import viteTsconfigPaths from 'vite-tsconfig-paths'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), viteTsconfigPaths()],
  resolve: {
    alias: {
      // Alias 'src' to the root of the 'src' directory
 
      '@crstl/app/src': path.resolve(__dirname, './src'),

       'domain': path.resolve(__dirname, './src/domain'),
       'boot': path.resolve(__dirname, './src/boot'),
      'globals': path.resolve(__dirname, './src/globals'),
      'presentation': path.resolve(__dirname, './src/presentation'),
      'components': path.resolve(__dirname, './src/components'),
      'validations': path.resolve(__dirname, './src/validations'),
      'models': path.resolve(__dirname, './src/models'),
    },
  },
  server: {
    port: 3000,
  },
  define: {
    // here is the main update
    global: 'globalThis',
  }
})


