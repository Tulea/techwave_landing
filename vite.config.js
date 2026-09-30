import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

// R9: el título y la meta descripción del index.html también viven en
// contenido.json. Este plugin reemplaza los placeholders del HTML con los
// valores leídos del JSON en cada build (y en el dev server).
function contenidoHtmlPlugin() {
  const contenido = JSON.parse(
    fs.readFileSync(path.join(rootDir, 'src/data/contenido.json'), 'utf-8'),
  )
  return {
    name: 'contenido-html',
    transformIndexHtml(html) {
      return html
        .replaceAll('%TITLE%', contenido.site.metaTitle)
        .replaceAll('%DESCRIPTION%', contenido.site.metaDescription)
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), contenidoHtmlPlugin()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    css: false,
  },
})
