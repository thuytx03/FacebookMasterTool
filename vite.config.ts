import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import react from '@vitejs/plugin-react';
// @ts-ignore
import manifest from './src/manifest';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    build: {
      emptyOutDir: true,
      outDir: 'build',
      minify: true,
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/chunk-[hash].js',
        },
      },
      chunkSizeWarningLimit: 2000,
    },
    server: {
      port: 2003,
      strictPort: true,
      hmr: {
        port: 2003,
      },
    },
    plugins: [crx({ manifest }), react()],
  };
});
