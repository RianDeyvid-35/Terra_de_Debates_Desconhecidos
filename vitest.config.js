// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Aponta para o arquivo que criamos no Passo 1
    setupFiles: ['./tests/setup/setup'],
    // Recomendado para não precisar ficar importando describe, it, expect em todo arquivo
    globals: true, 
  },
});