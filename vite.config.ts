import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { imagetools } from 'vite-imagetools'
import path from 'node:path'
import { resolveOrigin } from './scripts/site-origin.mjs'

/**
 * Stamps the deploy origin into index.html's metadata.
 *
 * This has to happen at build time rather than at runtime: the canonical link,
 * og:image and JSON-LD are read by crawlers and social scrapers that do not
 * execute JavaScript, so whatever is in the served HTML is all they ever see.
 *
 * `__SITE_ORIGIN__` is used rather than Vite's own `%VAR%` HTML syntax, which is
 * reserved for VITE_-prefixed variables from .env files.
 */
function siteOrigin(): Plugin {
  const origin = resolveOrigin()
  return {
    name: 'ies-site-origin',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replaceAll('__SITE_ORIGIN__', origin),
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), siteOrigin(), imagetools()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
