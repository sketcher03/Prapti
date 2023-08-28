import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

export default defineConfig(() => {
  return {
    server:{
      proxy:{
        '/api/requests':'http://localhost:4000'
      }
    },
    build: {
      outDir: 'build',
    },
    plugins: [react()],
  };
});