import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

const ROUTES = ['/', '/nosotros', '/servicios', '/contacto', '/trabaja-con-nosotros', '/privacidad']

function contenidoHtmlPlugin(env) {
  const contenido = JSON.parse(
    fs.readFileSync(path.join(rootDir, 'src/data/contenido.json'), 'utf-8'),
  )
  const { site } = contenido
  const [locality] = site.address.split(',').map((s) => s.trim())

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.name,
    url: site.url,
    logo: `${site.url}/assets/logo.png`,
    image: site.url + site.ogImage,
    description: site.metaDescription,
    telephone: site.phone,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: locality,
      addressRegion: locality,
      addressCountry: 'CR',
    },
    areaServed: 'CR',
    sameAs: Object.values(site.social),
  }

  const analyticsToken = env.VITE_CF_ANALYTICS_TOKEN?.trim()
  const analytics = analyticsToken
    ? `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='${JSON.stringify({ token: analyticsToken })}'></script>`
    : ''

  return {
    name: 'contenido-html',
    transformIndexHtml(html) {
      return html
        .replaceAll('%TITLE%', site.metaTitle)
        .replaceAll('%DESCRIPTION%', site.metaDescription)
        .replaceAll('%SITE_NAME%', site.name)
        .replaceAll('%SITE_URL%', site.url)
        .replaceAll('%OG_IMAGE%', site.url + site.ogImage)
        .replaceAll('%JSON_LD%', JSON.stringify(jsonLd).replaceAll('<', '\\u003c'))
        .replaceAll('%ANALYTICS%', analytics)
    },
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)
      const urls = ROUTES.map(
        (r) => `  <url><loc>${site.url}${r}</loc><lastmod>${today}</lastmod></url>`,
      ).join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`,
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, rootDir, 'VITE_'), ...process.env }
  return {
    plugins: [react(), tailwindcss(), contenidoHtmlPlugin(env)],
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/test/setup.js',
      css: false,
    },
  }
})
