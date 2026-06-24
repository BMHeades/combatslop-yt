import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite'

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifestVersion: 3,
  manifest: {
    permissions: ['storage'],
    // host_permissions: [],
    action: {},
    browser_specific_settings: {
      gecko: {
        id: "{03f7f66f-379d-42de-9b98-ffdba87431f4}",
        data_collection_permissions: {
          required: ["none"]
        },
      },
    },
  },
  srcDir: 'src',
  modules: ['@wxt-dev/module-svelte', '@wxt-dev/auto-icons'],

  vite: () => ({
    plugins: [tailwindcss() as any],
  }),
});
