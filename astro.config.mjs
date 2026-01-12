import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import compress from 'vite-plugin-compression2';

export default defineConfig({
  site: 'https://thebestqrgenerator.com',
  integrations: [
    react(),
    sitemap(),
  ],
  vite: {
    plugins: [
        tailwindcss(),
        compress()
    ],
  },
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
});
