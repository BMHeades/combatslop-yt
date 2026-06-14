import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite'

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifestVersion: 3,
  manifest: {
    action: {},
  },
  srcDir: 'src',
  modules: ['@wxt-dev/module-svelte'],
  vite: () => ({
    plugins: [tailwindcss() as any],
  }),
});
