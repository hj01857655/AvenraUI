import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  sourcemap: false,
  clean: true,
  splitting: false,
  external: ['react', 'react-dom'],
  outDir: 'dist',
  onSuccess: async () => {
    const distDir = join(process.cwd(), 'dist');
    if (!existsSync(distDir)) {
      mkdirSync(distDir, { recursive: true });
    }
    copyFileSync(join(process.cwd(), 'src', 'styles.css'), join(distDir, 'styles.css'));
  },
});
