import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    build: {
      sourcemap: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
  };
});
