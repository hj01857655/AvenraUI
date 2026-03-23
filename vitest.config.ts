import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts']
  },
  resolve: {
    alias: [
      {
        find: /^@avenra\/ui$/,
        replacement: fileURLToPath(new URL('./packages/ui/src/index.ts', import.meta.url))
      },
      {
        find: /^@avenra\/ui\/(.*)$/,
        replacement: `${fileURLToPath(new URL('./packages/ui/', import.meta.url))}$1`
      },
      {
        find: /^@avenra\/utils$/,
        replacement: fileURLToPath(new URL('./packages/utils/src/index.ts', import.meta.url))
      },
      {
        find: /^@avenra\/utils\/(.*)$/,
        replacement: `${fileURLToPath(new URL('./packages/utils/', import.meta.url))}$1`
      }
    ]
  }
});
