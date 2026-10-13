import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://prestio.com.br',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'always' },
});
