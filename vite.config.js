import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    hmr: {
      overlay: true
    }
  },
  preview: {
    open: true
  },
  optimizeDeps: {
    force: true,
    include: [
      '@emotion/react',
      '@emotion/styled',
      '@mui/material',
      '@mui/icons-material',
      '@mui/material/styles',
      'react',
      'react-dom',
      'react-router-dom'
    ]
  },
  build: {
    target: 'es2020',
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
});