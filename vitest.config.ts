import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
  resolve: {
    alias: {
      '@config': path.resolve(__dirname, './src/config'),
      'lib': path.resolve(__dirname, './src/lib'),
      'generated': path.resolve(__dirname, './src/generated'),
    },
  },
});
