import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Alias 'src' to the root of the 'src' directory
 
      '@crstl/app/src': path.resolve(__dirname, './src'),

       'domain': path.resolve(__dirname, './src/domain'),
       'boot': path.resolve(__dirname, './src/boot'),
      'globals': path.resolve(__dirname, './src/globals'),
      'presentation': path.resolve(__dirname, './src/presentation'),
      '@crstl/components': path.resolve(__dirname, './components'),
      '@crstl/validations': path.resolve(__dirname, './validations'),
      '@crstl/api/src/apis/models': path.resolve(__dirname, './models'),
    },
  },
  server: {
    port: 3000,
  },
})


