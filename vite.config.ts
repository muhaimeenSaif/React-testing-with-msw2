/// <reference types="vitest/config" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


const config =async () => {
  const tsconfigPaths = (await import('vite-tsconfig-paths')).default;

  return defineConfig({
    plugins: [
      react(),
      tsconfigPaths(),
    ],
    server: {
    //   open: true, // automatically open the app in the browser
      port: 3000,
      host: '0.0.0.0',
    },
    build: {
      outDir: 'build',
      sourcemap: false, // Disable source maps for production
    },
    optimizeDeps: {
      force: true,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
      deps: {
        optimizer: {
          web: {
            include: ['@eds/vanilla', '@dsi/react-eds'],
          },
        },
      },
    },
  });
};
export default config;
