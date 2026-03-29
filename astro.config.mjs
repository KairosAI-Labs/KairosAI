// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), icon()],
  output: 'server',

  vite: {
    plugins: [tailwindcss()],
  },

  server: {
    port: 3002,
    host: true,
  },

  adapter: node({
    mode: 'standalone',
  }),
});
