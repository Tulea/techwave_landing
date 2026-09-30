# TechWave Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir el nuevo sitio web estático de TechWave IT Services (multi-página, React) listo para desplegar en Cloudflare Pages.

**Architecture:** Vite + React 19 + React Router (4 rutas) + Tailwind CSS v4. Sin backend: el formulario hace POST directo al webhook de Zoho Forms. Todo el contenido vive en `src/data/content.js`. Build estático a `dist/` con fallback SPA (`_redirects`) para Cloudflare Pages.

**Tech Stack:** Vite 7, React 19, react-router-dom 7, Tailwind CSS 4 (@tailwindcss/vite), Vitest 3 + Testing Library (jsdom).

**Spec:** `docs/superpowers/specs/2026-09-29-techwave-website-design.md`

## Global Constraints

- Multi-página: `/`, `/nosotros`, `/servicios`, `/contacto` + 404. React Router con `BrowserRouter`.
- Oferta ÚNICAMENTE: Tecnología, Infraestructura, Consultoría, Ciberseguridad. NO mencionar desarrollo de software, gestión de datos ni cloud como servicio independiente en ningún texto.
- Contenido en español, tono formal ("usted").
- SIN sección de equipo, firmas ni nombres de personas (decisión explícita del usuario).
- Paleta: morado `#31285d` (brand-800) como color principal, acento cyan `#06b6d4`. Tema claro. Tipografía Inter (Google Fonts).
- Consistencia visual entre páginas (requisito explícito del usuario): las 4 páginas comparten el MISMO lenguaje visual — mismas tarjetas (`rounded-2xl border border-slate-200 shadow-sm`), mismo ritmo de secciones (`.section`), mismos botones (`btn-primary`/`btn-secondary`), mismos encabezados (`SectionHeading`), misma tipografía y paleta. Ninguna página introduce estilos propios fuera del sistema.
- Marca: `./Logos/3.png` es la imagen principal (logo navbar + favicon + visual del hero). Los SVG de `./Sitio web` son complementarios.
- Cifras del hero y contadores: usar los valores placeholder del contenido con el comentario `// CIFRAS POR CONFIRMAR` (el usuario aún no proporciona datos reales).
- Formulario: URL del webhook en `VITE_ZOHO_FORM_URL` (`.env`), nunca hardcodeada.
- Cada tarea termina con su commit. Mensajes de commit terminan con:
  `Co-Authored-By: Claude Code <noreply@anthropic.com>`
- Rutas relativas de assets: `/assets/...` (raíz pública).
- Node >= 18 requerido (verificar con `node -v`).

---

### Task 1: Scaffolding del proyecto (Vite + Tailwind v4 + Vitest)

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `.gitignore`, `.env.example`, `public/_redirects`
- Create: `src/main.jsx`, `src/App.jsx`, `src/index.css`, `src/test/setup.js`
- Test: `src/App.test.jsx`

**Interfaces:**
- Produces: dev server en `http://localhost:5173`, `npm run dev` / `npm run build` / `npm test` funcionando. `src/index.css` define tokens `--color-brand-*`, `--color-accent-*` y las clases reutilizables `.container-site`, `.btn-primary`, `.btn-secondary`, `.section`, `.eyebrow`. `App.jsx` define las 4 rutas con componentes de página placeholder.

- [ ] **Step 1: Crear package.json**

```json
{
  "name": "techwave-website",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-router-dom": "^7.6.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.1.0",
    "@testing-library/jest-dom": "^6.6.0",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^14.6.0",
    "@vitejs/plugin-react": "^5.0.0",
    "jsdom": "^26.1.0",
    "tailwindcss": "^4.1.0",
    "vite": "^7.0.0",
    "vitest": "^3.2.0"
  }
}
```

- [ ] **Step 2: Instalar dependencias**

Run: `npm install`
Expected: termina sin errores.

- [ ] **Step 3: Crear vite.config.js**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    css: false,
  },
})
```

- [ ] **Step 4: Crear index.html**

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TechWave IT Services — Tecnología, Infraestructura, Consultoría y Ciberseguridad</title>
    <meta name="description" content="TechWave IT Services: soluciones de tecnología, infraestructura, consultoría y ciberseguridad para empresas en Costa Rica. Su aliado estratégico en TI." />
    <link rel="icon" type="image/png" href="/assets/logo.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Crear .gitignore**

```
node_modules/
dist/
.env
.env.local
*.local
.superpowers/

# Materiales internos de marca (no van al repositorio ni a GitHub)
Firmas/
Fondo de pantalla/
Hoja membretada/
Machote ppt/
```

- [ ] **Step 6: Crear .env.example y public/_redirects**

`.env.example`:
```
# URL del webhook de Zoho Forms (formato JSONString). Ejemplo:
# https://forms.zohopublic.com/<organizacion>/form/<NombreForm>/json/JSONString
VITE_ZOHO_FORM_URL=
```

`public/_redirects`:
```
/* /index.html 200
```

- [ ] **Step 7: Crear src/index.css con los tokens de marca**

```css
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;

  --color-brand-50: #f4f2fb;
  --color-brand-100: #e9e5f7;
  --color-brand-200: #d3cbef;
  --color-brand-300: #b3a6e0;
  --color-brand-400: #8f7ccc;
  --color-brand-500: #6f57b8;
  --color-brand-600: #55439b;
  --color-brand-700: #42347d;
  --color-brand-800: #31285d;
  --color-brand-900: #241c44;
  --color-brand-950: #171130;

  --color-accent-400: #22d3ee;
  --color-accent-500: #06b6d4;
  --color-accent-600: #0891b2;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply bg-white text-slate-800 antialiased;
  }
}

@layer components {
  .container-site {
    @apply mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8;
  }
  .btn-primary {
    @apply inline-flex items-center justify-center rounded-lg bg-brand-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-800;
  }
  .btn-secondary {
    @apply inline-flex items-center justify-center rounded-lg border border-brand-800/20 bg-white px-6 py-3 text-sm font-semibold text-brand-800 transition hover:bg-brand-50;
  }
  .btn-sm {
    @apply px-4 py-2;
  }
  .section {
    @apply py-16 sm:py-24;
  }
  .eyebrow {
    @apply text-sm font-semibold uppercase tracking-widest text-accent-600;
  }
}
```

- [ ] **Step 8: Crear src/test/setup.js**

```js
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 9: Crear src/main.jsx y src/App.jsx (rutas con placeholders)**

`src/main.jsx`:
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

`src/App.jsx`:
```jsx
import { Routes, Route } from 'react-router-dom'

function Placeholder({ name }) {
  return <main className="container-site py-24"><h1 className="text-3xl font-bold text-brand-800">{name}</h1></main>
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Placeholder name="Inicio" />} />
      <Route path="/nosotros" element={<Placeholder name="Nosotros" />} />
      <Route path="/servicios" element={<Placeholder name="Servicios" />} />
      <Route path="/contacto" element={<Placeholder name="Contacto" />} />
    </Routes>
  )
}
```

- [ ] **Step 10: Escribir el test de rutas**

`src/App.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App.jsx'

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('App routes', () => {
  it.each([
    ['/', 'Inicio'],
    ['/nosotros', 'Nosotros'],
    ['/servicios', 'Servicios'],
    ['/contacto', 'Contacto'],
  ])('renderiza %s', (path, heading) => {
    renderAt(path)
    expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument()
  })
})
```

- [ ] **Step 11: Correr los tests**

Run: `npm test`
Expected: PASS (4 tests).

- [ ] **Step 12: Levantar el dev server y verificar**

Run: `npm run dev` (en background)
Expected: http://localhost:5173/ responde con la página placeholder "Inicio" y los estilos base de Tailwind aplicados (fondo blanco, tipografía Inter). Detener el server.

- [ ] **Step 13: Commit**

```bash
git add -A
git commit -m "feat: scaffolding vite + react + tailwind + vitest con rutas base

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

---

### Task 2: Assets de marca y contenido centralizado

**Files:**
- Create: `public/assets/logo.png` (copia de `./Logos/3.png`), `public/assets/logo-wordmark.svg` (copia de `./Sitio web/1.svg`), `public/assets/hero-image.png` (copia de `./Sitio web/4.png`), `public/assets/brand-2.svg` (copia de `./Sitio web/2.svg`), `public/assets/brand-3.svg` (copia de `./Sitio web/3.svg`)
- Create: `src/data/content.js`
- Test: `src/data/content.test.js`

**Interfaces:**
- Produces: `src/data/content.js` exporta `site`, `nav`, `hero`, `quickLinks`, `aboutBrief`, `painPoints`, `services` (4 items: `tecnologia`, `infraestructura`, `consultoria`, `ciberseguridad` con `slug`, `name`, `summary`, `features[]`), `proteja`, `allies`, `counters`, `testimonials`, `finalCta`, `about` (historia, misión, visión, valores[]), `contact` (campos y opciones del formulario). Todos los componentes de tareas posteriores consumen SOLO estas exportaciones.

- [ ] **Step 1: Copiar los assets de marca a public/assets**

Run (PowerShell):
```powershell
New-Item -ItemType Directory -Force public/assets | Out-Null
Copy-Item "Logos/3.png" public/assets/logo.png
Copy-Item "Sitio web/1.svg" public/assets/logo-wordmark.svg
Copy-Item "Sitio web/4.png" public/assets/hero-image.png
Copy-Item "Sitio web/2.svg" public/assets/brand-2.svg
Copy-Item "Sitio web/3.svg" public/assets/brand-3.svg
```
Expected: 5 archivos en `public/assets/`.

- [ ] **Step 2: Crear src/data/content.js con todo el contenido**

```js
// CONTENIDO DEL SITIO — edite aquí los textos sin tocar componentes.
// CIFRAS POR CONFIRMAR: los valores marcados son placeholders; reemplácelos con los datos reales.

export const site = {
  name: 'TechWave IT Services',
  tagline: 'Empresas protegidas, operación sin interrupciones.',
  phone: '+506 7128-7960',
  email: 'info@techwaveitservices.com',
  address: 'San Rafael, Alajuela, Costa Rica',
}

export const nav = [
  { label: 'Inicio', to: '/' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Servicios', to: '/servicios' },
  { label: 'Contacto', to: '/contacto' },
]

export const hero = {
  eyebrow: 'Tecnología · Infraestructura · Consultoría · Ciberseguridad',
  title: 'Tecnología que impulsa su negocio, seguridad que lo protege',
  subtitle:
    'En TechWave IT Services diseñamos, implementamos y administramos soluciones de tecnología, infraestructura y ciberseguridad para que las empresas costarricenses operen con confianza.',
  primaryCta: { label: 'Obtenga un assessment gratis', to: '/contacto' },
  secondaryCta: { label: 'Contáctenos', to: '/contacto' },
  // CIFRAS POR CONFIRMAR
  stats: [
    { value: 5, suffix: '+', label: 'Años de operación' },
    { value: 25, suffix: '+', label: 'Clientes atendidos' },
    { value: 99, suffix: '%', label: 'Disponibilidad de servicio' },
  ],
}

export const quickLinks = [
  { label: 'Assessment gratis', to: '/contacto' },
  { label: 'Solicitar cotización', to: '/contacto' },
  { label: 'Contáctenos', to: '/contacto' },
]

export const aboutBrief = {
  eyebrow: 'Quiénes somos',
  title: 'Su aliado estratégico en tecnología',
  body: 'Somos una empresa costarricense de servicios de tecnología que acompaña a nuestros clientes en la adopción, operación y protección de su infraestructura. Nuestro equipo combina conocimiento técnico, certificaciones de fabricantes líderes y atención personalizada para entregar soluciones a la medida.',
  highlights: [
    'Consultores con experiencia en la industria',
    'Atención personalizada y respuesta ágil',
    'Alianzas con fabricantes líderes',
  ],
}

export const painPoints = {
  eyebrow: '¿Por qué importa?',
  title: 'Los riesgos que su empresa enfrenta hoy',
  cards: [
    {
      stat: '6 meses',
      title: 'El tiempo que tarda en cerrar una PYME tras un ataque grave',
      body: 'El 60 % de las pequeñas empresas que sufren un ciberataque serio cierran en menos de seis meses. Nuestro servicio administrado de ciberseguridad detecta y responde antes de que sea tarde.',
    },
    {
      stat: '80 %',
      title: 'De las brechas de seguridad se deben a errores humanos',
      body: 'La mayoría de los incidentes empieza con un clic equivocado. Concientizamos a sus colaboradores y reducimos la superficie de riesgo de su organización.',
    },
    {
      stat: '43 %',
      title: 'De los ciberataques se dirige a pequeñas y medianas empresas',
      body: 'Los atacantes buscan el eslabón más débil. Le brindamos el nivel de protección que antes solo estaba al alcance de las grandes corporaciones.',
    },
    {
      stat: '1 hora',
      title: 'De caída puede costar miles de dólares en ventas perdidas',
      body: 'La continuidad del negocio no es opcional. Diseñamos infraestructura con respaldos y recuperación ante desastres para que su operación nunca se detenga.',
    },
  ],
}

export const services = [
  {
    slug: 'tecnologia',
    name: 'Tecnología',
    summary:
      'Soluciones tecnológicas a la medida de su operación: selección, implementación y administración de las herramientas que su equipo realmente aprovecha.',
    features: [
      'Asesoría en adopción de tecnología',
      'Administración de licencias y suscripciones',
      'Soporte técnico continuo',
    ],
  },
  {
    slug: 'infraestructura',
    name: 'Infraestructura',
    summary:
      'Diseñamos, implementamos y administramos infraestructura escalable y confiable: redes, servidores, respaldos y continuidad del negocio.',
    features: [
      'Diseño e implementación de redes',
      'Administración de servidores',
      'Respaldo y recuperación ante desastres',
    ],
  },
  {
    slug: 'consultoria',
    name: 'Consultoría',
    summary:
      'Decisiones de TI respaldadas por experiencia: evaluamos su operación actual y trazamos la ruta tecnológica correcta para alcanzar sus objetivos.',
    features: [
      'Evaluación de infraestructura y seguridad',
      'Planeación estratégica de TI',
      'Acompañamiento en proyectos de tecnología',
    ],
  },
  {
    slug: 'ciberseguridad',
    name: 'Ciberseguridad',
    summary:
      'Protección integral frente a amenazas: evaluaciones de vulnerabilidad, monitoreo y respuesta a incidentes, y concientización de usuarios.',
    features: [
      'Evaluaciones de vulnerabilidad',
      'Monitoreo y respuesta a incidentes',
      'Concientización de colaboradores',
    ],
  },
]

export const proteja = {
  eyebrow: 'Proteja sus datos',
  title: 'Soluciones de clase mundial para proteger su información',
  intro:
    'Contamos con alianzas con fabricantes líderes del mercado para respaldar y proteger el activo más valioso de su empresa: sus datos.',
  solutions: [
    {
      name: 'Veeam',
      tag: 'Respaldo y recuperación',
      body: 'Respaldos confiables y recuperación ante desastres: sus datos siempre disponibles y recuperables, sin importar el incidente.',
    },
    {
      name: 'Sophos',
      tag: 'Ciberseguridad',
      body: 'Protección de endpoints y red contra ransomware y amenazas avanzadas, con detección y respuesta en tiempo real.',
    },
  ],
  cta: { label: 'Hablemos de su estrategia de respaldo', to: '/contacto' },
}

export const allies = {
  eyebrow: 'Alianzas',
  title: 'Trabajamos con fabricantes líderes del mercado',
  items: ['Veeam', 'Sophos'],
  note: 'Alianzas estratégicas con fabricantes reconocidos a nivel mundial.',
}

export const counters = {
  eyebrow: 'Trayectoria',
  title: 'Experiencia que habla por sí misma',
  // CIFRAS POR CONFIRMAR
  items: [
    { value: 5, suffix: '+', label: 'Años de experiencia' },
    { value: 25, suffix: '+', label: 'Clientes atendidos' },
    { value: 4, suffix: '', label: 'Líneas de servicio' },
    { value: 24, suffix: '/7', label: 'Disponibilidad de soporte' },
  ],
}

export const testimonials = {
  eyebrow: 'Testimonios',
  title: 'Lo que dicen nuestros clientes',
  items: [
    {
      quote:
        'Su equipo está bien informado y es profesional. Nos acompañan con una infraestructura estable y segura.',
      author: 'Salvador Hernández',
      role: 'Infraestructura',
      company: 'Vivibanco',
    },
  ],
}

export const finalCta = {
  title: '¿Tiene una emergencia o un proyecto en mente?',
  body: 'Cuéntenos su reto y le respondemos con una propuesta clara y sin compromiso.',
  buttons: [
    { label: 'Llámenos: +506 7128-7960', to: 'tel:+50671287960', primary: false },
    { label: 'Solicitar assessment', to: '/contacto', primary: true },
  ],
}

export const about = {
  eyebrow: 'Nosotros',
  title: 'Una empresa costarricense dedicada a su tecnología',
  story: [
    'TechWave IT Services nace con un propósito claro: acompañar a las empresas costarricenses en la adopción y administración de su tecnología. Creemos que la tecnología debe ser un habilitador del negocio, no un dolor de cabeza.',
    'Nos especializamos en cuatro áreas: tecnología, infraestructura, consultoría y ciberseguridad. Este enfoque nos permite ofrecer soluciones integrales, con la cercanía de un socio local y los estándares de los fabricantes líderes a nivel mundial.',
  ],
  mission:
    'Brindar soluciones de tecnología, infraestructura, consultoría y ciberseguridad que permitan a nuestros clientes operar con confianza, protegiendo su información y optimizando sus recursos.',
  vision:
    'Ser el aliado estratégico de tecnología de referencia para las empresas de Costa Rica, reconocido por la calidad de nuestro servicio y la solidez de nuestras soluciones.',
  values: [
    { name: 'Compromiso', body: 'Asumimos los retos de nuestros clientes como propios.' },
    { name: 'Excelencia', body: 'Hacemos bien el trabajo, con estándares de la industria.' },
    { name: 'Confianza', body: 'Protegemos lo que nuestros clientes más valoran: sus datos.' },
    { name: 'Innovación', body: 'Le acercamos las tecnologías que realmente aportan valor.' },
  ],
  certifications: {
    eyebrow: 'Certificaciones y alianzas',
    title: 'Respaldados por fabricantes líderes',
    items: ['Veeam', 'Sophos'],
  },
}

export const contact = {
  eyebrow: 'Contacto',
  title: 'Hablemos de su proyecto',
  body: 'Complete el formulario y le responderemos a la brevedad. Si prefiere, llámenos o escríbanos directamente.',
  services: ['Tecnología', 'Infraestructura', 'Consultoría', 'Ciberseguridad', 'Otro'],
  form: {
    firstName: { label: 'Primer nombre', required: true },
    lastName: { label: 'Apellido', required: true },
    email: { label: 'Correo electrónico', required: true },
    phone: { label: 'Teléfono', required: false },
    service: { label: 'Servicio de interés', required: false },
    message: { label: 'Mensaje', required: true },
  },
  success: '¡Gracias por enviar! Le contactaremos muy pronto.',
  notConfigured:
    'El formulario aún no está configurado. Escríbanos directamente a info@techwaveitservices.com.',
  error: 'No se pudo enviar su mensaje. Inténtelo de nuevo o escríbanos a info@techwaveitservices.com.',
  mapEmbed:
    'https://www.openstreetmap.org/export/embed.html?bbox=-84.2200%2C10.0650%2C-84.2000%2C10.0800&layer=mapnik&marker=10.0725%2C-84.2100',
}
```

- [ ] **Step 3: Escribir el test de validación del contenido**

`src/data/content.test.js`:
```js
import { site, nav, hero, services, painPoints, counters, contact } from './content.js'

describe('content', () => {
  it('tiene datos de contacto completos', () => {
    expect(site.phone).toMatch(/^\+506/)
    expect(site.email).toContain('@')
  })

  it('tiene exactamente 4 servicios', () => {
    expect(services).toHaveLength(4)
    expect(services.map((s) => s.slug).sort()).toEqual([
      'ciberseguridad',
      'consultoria',
      'infraestructura',
      'tecnologia',
    ])
  })

  it('cada servicio tiene nombre, resumen y 3 beneficios', () => {
    services.forEach((s) => {
      expect(s.name).toBeTruthy()
      expect(s.summary).toBeTruthy()
      expect(s.features).toHaveLength(3)
    })
  })

  it('no menciona servicios fuera de la oferta', () => {
    const everything = JSON.stringify({ hero, services, painPoints, counters, contact })
    expect(everything.toLowerCase()).not.toMatch(/desarrollo de software|gesti[oó]n de datos|soluciones en la nube/)
  })

  it('la navegación apunta a las 4 rutas', () => {
    expect(nav.map((n) => n.to)).toEqual(['/', '/nosotros', '/servicios', '/contacto'])
  })
})
```

- [ ] **Step 4: Correr los tests**

Run: `npm test`
Expected: PASS (9 tests: 4 de rutas + 5 de contenido).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: assets de marca y contenido centralizado en content.js

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

---

### Task 3: Layout — Navbar, Footer, Layout y página 404

**Files:**
- Create: `src/components/Navbar.jsx`, `src/components/Footer.jsx`, `src/components/Layout.jsx`, `src/components/ScrollToTop.jsx`, `src/components/NotFound.jsx`
- Modify: `src/App.jsx` (usar Layout y NotFound)
- Test: `src/components/Navbar.test.jsx`

**Interfaces:**
- Consumes: `site`, `nav`, `services`, `finalCta` de `src/data/content.js`. Clases de `src/index.css`.
- Produces: `<Layout />` renderiza `<Navbar />` + `<ScrollToTop />` + `<main><Outlet /></main>` + `<Footer />`. Las páginas de las tareas 4–7 se montan dentro de este Layout.

- [ ] **Step 1: Crear src/components/ScrollToTop.jsx**

```jsx
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}
```

- [ ] **Step 2: Crear src/components/Navbar.jsx**

```jsx
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { site, nav } from '../data/content.js'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="container-site flex h-16 items-center justify-between" aria-label="Principal">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src="/assets/logo.png" alt="" className="h-9 w-9 rounded-md object-contain" />
          <span className="text-lg font-bold tracking-tight text-brand-800">
            TechWave<span className="text-accent-500">.</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${
                    isActive ? 'font-semibold text-brand-800' : 'text-slate-600 hover:text-brand-800'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <Link to="/contacto" className="btn-primary btn-sm hidden md:inline-flex">
          Assessment gratis
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-brand-800 hover:bg-brand-50 md:hidden"
          aria-expanded={open}
          aria-label="Abrir menú"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <ul className="container-site flex flex-col gap-1 py-3">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-md px-3 py-2 text-sm font-medium ${
                      isActive ? 'bg-brand-50 font-semibold text-brand-800' : 'text-slate-600 hover:bg-brand-50'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link to="/contacto" className="btn-primary mt-2 w-full" onClick={() => setOpen(false)}>
                Assessment gratis
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 3: Crear src/components/Footer.jsx**

```jsx
import { Link } from 'react-router-dom'
import { site, nav, services } from '../data/content.js'

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-slate-300">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <img src="/assets/logo.png" alt="" className="h-9 w-9 rounded-md object-contain" />
            <span className="text-lg font-bold text-white">
              TechWave<span className="text-accent-400">.</span>
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">{site.tagline}</p>
        </div>

        <nav aria-label="Enlaces">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Enlaces</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-slate-400 transition hover:text-accent-400">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Servicios">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Servicios</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to="/servicios" className="text-slate-400 transition hover:text-accent-400">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Contacto</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            <li>{site.address}</li>
            <li>
              <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`} className="transition hover:text-accent-400">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="transition hover:text-accent-400">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="container-site py-5 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {site.name}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Crear src/components/Layout.jsx y src/components/NotFound.jsx**

`src/components/Layout.jsx`:
```jsx
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import ScrollToTop from './ScrollToTop.jsx'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
```

`src/components/NotFound.jsx`:
```jsx
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-site mx-auto max-w-2xl py-16 text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-3 text-4xl font-bold text-brand-800">Página no encontrada</h1>
        <p className="mt-4 text-slate-600">
          La página que busca no existe o fue movida.
        </p>
        <Link to="/" className="btn-primary mt-8">
          Volver al inicio
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Actualizar src/App.jsx con Layout**

```jsx
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import NotFound from './components/NotFound.jsx'

function Placeholder({ name }) {
  return <main className="container-site py-24"><h1 className="text-3xl font-bold text-brand-800">{name}</h1></main>
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Placeholder name="Inicio" />} />
        <Route path="/nosotros" element={<Placeholder name="Nosotros" />} />
        <Route path="/servicios" element={<Placeholder name="Servicios" />} />
        <Route path="/contacto" element={<Placeholder name="Contacto" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
```

- [ ] **Step 6: Reescribir src/App.test.jsx para que no dependa de los placeholders**

Las páginas finales (Tareas 5–8) reemplazarán los placeholders y sus títulos ya
no serán "Inicio"/"Nosotros"/etc. El test de rutas pasa a verificar el layout
estable (navbar + footer), que no cambia. Sobrescriba por completo el archivo
de la Tarea 1 con:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App.jsx'

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('App routes', () => {
  it.each(['/', '/nosotros', '/servicios', '/contacto'])(
    'renderiza %s con el layout (navbar y footer)',
    (path) => {
      renderAt(path)
      expect(screen.getByRole('navigation', { name: 'Principal' })).toBeInTheDocument()
      expect(screen.getByText(/Todos los derechos reservados/)).toBeInTheDocument()
    },
  )
})
```

- [ ] **Step 7: Escribir el test del Navbar**

`src/components/Navbar.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar.jsx'

function renderNavbar() {
  return render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  )
}

describe('Navbar', () => {
  it('muestra los 4 enlaces de navegación', () => {
    renderNavbar()
    expect(screen.getAllByText('Inicio').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Nosotros').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Servicios').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Contacto').length).toBeGreaterThan(0)
  })

  it('abre el menú móvil al hacer clic', async () => {
    const user = userEvent.setup()
    renderNavbar()
    await user.click(screen.getByRole('button', { name: 'Abrir menú' }))
    expect(screen.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute('aria-expanded', 'true')
  })
})
```

- [ ] **Step 8: Correr los tests y verificar en el dev server**

Run: `npm test`
Expected: PASS (11 tests).

Run: `npm run dev` (background). Verificar en http://localhost:5173/:
- Navbar sticky con logo, 4 enlaces y botón "Assessment gratis".
- Menú hamburguesa funciona en viewport móvil (DevTools → modo responsive 375px).
- Ruta inexistente (http://localhost:5173/ruta-falsa) muestra la página 404.
- Footer oscuro con enlaces y datos de contacto. Detener el server.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: layout con navbar, footer y página 404

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

---

### Task 4: Sección compartida — encabezados y contadores animados

**Files:**
- Create: `src/components/SectionHeading.jsx`, `src/components/Counters.jsx`
- Test: `src/components/Counters.test.jsx`

**Interfaces:**
- Consumes: `counters` de `src/data/content.js`.
- Produces: `<SectionHeading eyebrow title intro />` y `<Counters />` (sección con contadores animados al entrar en viewport). Usados por Home (Task 5) y Nosotros (Task 6).

- [ ] **Step 1: Crear src/components/SectionHeading.jsx**

```jsx
export default function SectionHeading({ eyebrow, title, intro, align = 'center', dark = false }) {
  const alignClass = align === 'center' ? 'mx-auto text-center' : 'text-left'
  return (
    <div className={`max-w-3xl ${alignClass}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className={`mt-3 text-3xl font-bold tracking-tight sm:text-4xl ${dark ? 'text-white' : 'text-brand-900'}`}>
        {title}
      </h2>
      {intro && <p className={`mt-4 text-lg leading-relaxed ${dark ? 'text-brand-200' : 'text-slate-600'}`}>{intro}</p>}
    </div>
  )
}
```

- [ ] **Step 2: Crear src/components/Counters.jsx**

```jsx
import { useEffect, useRef, useState } from 'react'
import { counters } from '../data/content.js'
import SectionHeading from './SectionHeading.jsx'

function useInView(ref) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref])
  return inView
}

function Counter({ value, suffix = '', label, start }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!start) return undefined
    const duration = 1200
    const t0 = performance.now()
    let raf
    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1)
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, value])

  return (
    <div className="text-center">
      <p className="text-4xl font-bold text-white sm:text-5xl">
        {n}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-brand-200">{label}</p>
    </div>
  )
}

export default function Counters() {
  const ref = useRef(null)
  const inView = useInView(ref)
  return (
    <section className="section bg-brand-800">
      <div className="container-site">
        <SectionHeading eyebrow={counters.eyebrow} title={counters.title} dark />
        <div ref={ref} className="mt-12 grid grid-cols-2 gap-10 md:grid-cols-4">
          {counters.items.map((c) => (
            <Counter key={c.label} {...c} start={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Escribir el test de Counters**

`src/components/Counters.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react'
import Counters from './Counters.jsx'

// jsdom no implementa IntersectionObserver: se mockea como inView=true de inmediato.
class MockObserver {
  constructor(cb) {
    this.cb = cb
  }
  observe(el) {
    this.cb([{ isIntersecting: true }])
  }
  disconnect() {}
}

beforeAll(() => {
  vi.stubGlobal('IntersectionObserver', MockObserver)
})

afterAll(() => {
  vi.unstubAllGlobals()
})

describe('Counters', () => {
  it('renderiza los 4 contadores con sus etiquetas', () => {
    render(<Counters />)
    expect(screen.getByText('Años de experiencia')).toBeInTheDocument()
    expect(screen.getByText('Clientes atendidos')).toBeInTheDocument()
    expect(screen.getByText('Líneas de servicio')).toBeInTheDocument()
    expect(screen.getByText('Disponibilidad de soporte')).toBeInTheDocument()
  })
})
```

- [ ] **Step 4: Correr los tests**

Run: `npm test`
Expected: PASS (12 tests).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: section heading y contadores animados compartidos

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

---

> **PARALELIZACIÓN:** Las Tareas 5, 6, 7 y 8 son independientes entre sí (cada una crea sus propios componentes y páginas, consumiendo solo `content.js` y los componentes de las Tareas 1–4). Pueden ejecutarse en paralelo por agentes distintos. Si se ejecutan en paralelo, cada agente debe hacer su commit en su orden sin tocar archivos de otras tareas. Al terminar las cuatro, continuar con la Tarea 9.

### Task 5: Página de Inicio

**Files:**
- Create: `src/components/home/Hero.jsx`, `src/components/home/QuickLinks.jsx`, `src/components/home/AboutBrief.jsx`, `src/components/home/PainPoints.jsx`, `src/components/home/ServiceCards.jsx`, `src/components/home/ProtejaSusDatos.jsx`, `src/components/home/LogoWall.jsx`, `src/components/home/Testimonials.jsx`, `src/components/home/FinalCta.jsx`
- Create: `src/pages/Home.jsx`
- Modify: `src/pages/Home.jsx` (ya existe como stub conectado en App.jsx; reemplazarlo por completo)
- Test: `src/pages/Home.test.jsx`

**Interfaces:**
- Consumes: `hero`, `quickLinks`, `aboutBrief`, `painPoints`, `services`, `proteja`, `allies`, `testimonials`, `finalCta` de `src/data/content.js`; `SectionHeading`, `Counters`.
- Produces: `src/pages/Home.jsx` como default export que ensambla las 10 secciones en orden: Hero → QuickLinks → AboutBrief → PainPoints → ServiceCards → ProtejaSusDatos → LogoWall → Counters → Testimonials → FinalCta.

- [ ] **Step 1: Crear Hero.jsx**

```jsx
import { Link } from 'react-router-dom'
import { hero } from '../../data/content.js'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
      <div className="container-site grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
        <div>
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-brand-900 sm:text-5xl">
            {hero.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">{hero.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to={hero.primaryCta.to} className="btn-primary">
              {hero.primaryCta.label}
            </Link>
            <Link to={hero.secondaryCta.to} className="btn-secondary">
              {hero.secondaryCta.label}
            </Link>
          </div>
          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-slate-200 pt-8">
            {hero.stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dt className="order-2 mt-1 text-xs text-slate-500">{s.label}</dt>
                <dd className="order-1 text-3xl font-bold text-brand-800">
                  {s.value}
                  {s.suffix}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-accent-500/20 to-brand-500/20 blur-2xl" aria-hidden="true" />
          <img
            src="/assets/hero-image.png"
            alt="Identidad visual de TechWave IT Services"
            className="relative w-full rounded-3xl border border-brand-100 object-cover shadow-xl"
            width="512"
            height="512"
          />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Crear QuickLinks.jsx**

```jsx
import { Link } from 'react-router-dom'
import { quickLinks } from '../../data/content.js'

export default function QuickLinks() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="container-site grid gap-px py-4 sm:grid-cols-3">
        {quickLinks.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className="flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
          >
            {item.label}
            <span aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Crear AboutBrief.jsx**

```jsx
import { aboutBrief } from '../../data/content.js'
import SectionHeading from '../SectionHeading.jsx'

export default function AboutBrief() {
  return (
    <section className="section">
      <div className="container-site">
        <SectionHeading eyebrow={aboutBrief.eyebrow} title={aboutBrief.title} />
        <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-relaxed text-slate-600">
          {aboutBrief.body}
        </p>
        <ul className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
          {aboutBrief.highlights.map((h) => (
            <li
              key={h}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-700 shadow-sm"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 shrink-0 text-accent-500" aria-hidden="true">
                <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
              </svg>
              {h}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Crear PainPoints.jsx**

```jsx
import { painPoints } from '../../data/content.js'
import SectionHeading from '../SectionHeading.jsx'

export default function PainPoints() {
  return (
    <section className="section bg-brand-50/60">
      <div className="container-site">
        <SectionHeading eyebrow={painPoints.eyebrow} title={painPoints.title} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {painPoints.cards.map((card) => (
            <article key={card.title} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-3xl font-bold text-brand-800">{card.stat}</p>
              <h3 className="mt-3 text-sm font-semibold leading-snug text-brand-900">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Crear ServiceCards.jsx**

```jsx
import { Link } from 'react-router-dom'
import { services } from '../../data/content.js'
import SectionHeading from '../SectionHeading.jsx'

const icons = {
  tecnologia: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
  ),
  infraestructura: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" />
  ),
  consultoria: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
  ),
  ciberseguridad: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
  ),
}

export default function ServiceCards() {
  return (
    <section className="section">
      <div className="container-site">
        <SectionHeading eyebrow="Nuestros servicios" title="Cuatro líneas de servicio, un solo aliado" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <article
              key={s.slug}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-800">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden="true">
                  {icons[s.slug]}
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-bold text-brand-900">{s.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.summary}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
                {s.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-accent-500" aria-hidden="true">•</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/servicios" className="mt-auto pt-5 text-sm font-semibold text-brand-800 transition group-hover:text-accent-600">
                Ver más →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Crear ProtejaSusDatos.jsx**

```jsx
import { Link } from 'react-router-dom'
import { proteja } from '../../data/content.js'
import SectionHeading from '../SectionHeading.jsx'

export default function ProtejaSusDatos() {
  return (
    <section className="section bg-brand-900">
      <div className="container-site">
        <SectionHeading eyebrow={proteja.eyebrow} title={proteja.title} intro={proteja.intro} dark />
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
          {proteja.solutions.map((sol) => (
            <article key={sol.name} className="rounded-2xl border border-white/10 bg-brand-800/60 p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">{sol.tag}</p>
              <h3 className="mt-2 text-2xl font-bold text-white">{sol.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-200">{sol.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to={proteja.cta.to} className="btn-primary bg-accent-500 hover:bg-accent-600">
            {proteja.cta.label}
          </Link>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 7: Crear LogoWall.jsx**

```jsx
import { allies } from '../../data/content.js'
import SectionHeading from '../SectionHeading.jsx'

export default function LogoWall() {
  return (
    <section className="section">
      <div className="container-site">
        <SectionHeading eyebrow={allies.eyebrow} title={allies.title} />
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {allies.items.map((item) => (
            <span
              key={item}
              className="rounded-xl border border-slate-200 bg-white px-10 py-6 text-xl font-bold text-slate-400 shadow-sm"
            >
              {item}
            </span>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-slate-500">{allies.note}</p>
      </div>
    </section>
  )
}
```

- [ ] **Step 8: Crear Testimonials.jsx y FinalCta.jsx**

`Testimonials.jsx`:
```jsx
import { testimonials } from '../../data/content.js'
import SectionHeading from '../SectionHeading.jsx'

export default function Testimonials() {
  return (
    <section className="section bg-brand-50/60">
      <div className="container-site">
        <SectionHeading eyebrow={testimonials.eyebrow} title={testimonials.title} />
        <div className="mx-auto mt-12 grid max-w-3xl gap-6">
          {testimonials.items.map((t) => (
            <figure key={t.author} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <blockquote className="text-lg leading-relaxed text-slate-700">“{t.quote}”</blockquote>
              <figcaption className="mt-5 text-sm">
                <p className="font-semibold text-brand-900">{t.author}</p>
                <p className="text-slate-500">
                  {t.role} · {t.company}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
```

`FinalCta.jsx`:
```jsx
import { Link } from 'react-router-dom'
import { finalCta } from '../../data/content.js'

export default function FinalCta() {
  return (
    <section className="section">
      <div className="container-site">
        <div className="rounded-3xl bg-gradient-to-r from-brand-800 to-brand-600 px-8 py-14 text-center sm:px-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">{finalCta.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-100">{finalCta.body}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {finalCta.buttons.map((b) =>
              b.primary ? (
                <Link key={b.label} to={b.to} className="btn-primary bg-accent-500 hover:bg-accent-600">
                  {b.label}
                </Link>
              ) : (
                <a key={b.label} href={b.to} className="btn-secondary border-white/30 bg-transparent text-white hover:bg-white/10">
                  {b.label}
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 9: Crear src/pages/Home.jsx y actualizar src/App.jsx**

`src/pages/Home.jsx`:
```jsx
import Hero from '../components/home/Hero.jsx'
import QuickLinks from '../components/home/QuickLinks.jsx'
import AboutBrief from '../components/home/AboutBrief.jsx'
import PainPoints from '../components/home/PainPoints.jsx'
import ServiceCards from '../components/home/ServiceCards.jsx'
import ProtejaSusDatos from '../components/home/ProtejaSusDatos.jsx'
import LogoWall from '../components/home/LogoWall.jsx'
import Counters from '../components/Counters.jsx'
import Testimonials from '../components/home/Testimonials.jsx'
import FinalCta from '../components/home/FinalCta.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <QuickLinks />
      <AboutBrief />
      <PainPoints />
      <ServiceCards />
      <ProtejaSusDatos />
      <LogoWall />
      <Counters />
      <Testimonials />
      <FinalCta />
    </>
  )
}
```

`src/pages/Home.jsx` ya existe como stub y está conectado en `src/App.jsx` (no lo toque). Reemplácelo por completo con el código de arriba.

- [ ] **Step 10: Escribir el test de Home**

`src/pages/Home.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home.jsx'
import { hero, services } from '../data/content.js'

class MockObserver {
  constructor(cb) {
    this.cb = cb
  }
  observe(el) {
    this.cb([{ isIntersecting: true }])
  }
  disconnect() {}
}

beforeAll(() => {
  vi.stubGlobal('IntersectionObserver', MockObserver)
})

afterAll(() => {
  vi.unstubAllGlobals()
})

describe('Home', () => {
  it('renderiza el título del hero', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { name: hero.title })).toBeInTheDocument()
  })

  it('renderiza los 4 servicios', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )
    services.forEach((s) => {
      expect(screen.getByRole('heading', { name: s.name })).toBeInTheDocument()
    })
  })
})
```

Nota: `getByRole('heading', { name: s.name })` fallará si otro heading repite el nombre; si ocurre, cambiar a `screen.getAllByRole('heading', { name: s.name }).length` y asertar `toBeGreaterThan(0)`.

- [ ] **Step 11: Correr los tests de esta tarea**

Run: `npx vitest run src/pages/Home.test.jsx`
Expected: PASS (2 tests).

No ejecute la suite completa ni el dev server: las páginas hermanas se están
implementando en paralelo en este momento. La verificación visual de todas
las páginas se hace en la Tarea 9.

- [ ] **Step 12: Commit (SOLO los archivos de esta tarea)**

```bash
git add src/pages/Home.jsx src/pages/Home.test.jsx src/components/home/
git commit -m "feat: página de inicio con sus 10 secciones

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

---

### Task 6: Página Nosotros

**Files:**
- Create: `src/pages/Nosotros.jsx`
- Modify: `src/pages/Nosotros.jsx` (ya existe como stub conectado en App.jsx; reemplazarlo por completo)
- Test: `src/pages/Nosotros.test.jsx`

**Interfaces:**
- Consumes: `about` de `src/data/content.js`; `SectionHeading`, `Counters`.
- Produces: `src/pages/Nosotros.jsx` default export con secciones: encabezado, historia, misión/visión (2 tarjetas), valores (4 tarjetas), certificaciones, `Counters`.

- [ ] **Step 1: Crear src/pages/Nosotros.jsx**

```jsx
import { about } from '../data/content.js'
import SectionHeading from '../components/SectionHeading.jsx'
import Counters from '../components/Counters.jsx'

export default function Nosotros() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white py-16 sm:py-20">
        <div className="container-site">
          <SectionHeading eyebrow={about.eyebrow} title={about.title} align="left" />
        </div>
      </section>

      <section className="section pt-8">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div className="space-y-5 text-lg leading-relaxed text-slate-600">
            {about.story.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
          <div className="grid content-start gap-6">
            <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-lg font-bold text-brand-800">Misión</h2>
              <p className="mt-3 leading-relaxed text-slate-600">{about.mission}</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-lg font-bold text-brand-800">Visión</h2>
              <p className="mt-3 leading-relaxed text-slate-600">{about.vision}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section bg-brand-50/60">
        <div className="container-site">
          <SectionHeading eyebrow="Valores" title="Lo que nos guía" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((v) => (
              <article key={v.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-brand-900">{v.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-site">
          <SectionHeading
            eyebrow={about.certifications.eyebrow}
            title={about.certifications.title}
          />
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {about.certifications.items.map((item) => (
              <span
                key={item}
                className="rounded-xl border border-slate-200 bg-white px-10 py-6 text-xl font-bold text-slate-400 shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Counters />
    </>
  )
}
```

- [ ] **Step 2: Reemplazar el stub**

`src/pages/Nosotros.jsx` ya existe como stub y está conectado en `src/App.jsx`. Reemplácelo por completo con el código del Step 1. NO modifique `src/App.jsx`.

- [ ] **Step 3: Escribir el test**

`src/pages/Nosotros.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Nosotros from './Nosotros.jsx'
import { about } from '../data/content.js'

class MockObserver {
  constructor(cb) {
    this.cb = cb
  }
  observe(el) {
    this.cb([{ isIntersecting: true }])
  }
  disconnect() {}
}

beforeAll(() => {
  vi.stubGlobal('IntersectionObserver', MockObserver)
})

afterAll(() => {
  vi.unstubAllGlobals()
})

describe('Nosotros', () => {
  it('muestra misión, visión y los 4 valores', () => {
    render(
      <MemoryRouter>
        <Nosotros />
      </MemoryRouter>,
    )
    expect(screen.getByText('Misión')).toBeInTheDocument()
    expect(screen.getByText('Visión')).toBeInTheDocument()
    about.values.forEach((v) => {
      expect(screen.getByRole('heading', { name: v.name })).toBeInTheDocument()
    })
  })
})
```

- [ ] **Step 4: Correr los tests de esta tarea**

Run: `npx vitest run src/pages/Nosotros.test.jsx`
Expected: PASS (1 test).

No ejecute la suite completa ni el dev server: las páginas hermanas se están
implementando en paralelo. La verificación visual se hace en la Tarea 9.

- [ ] **Step 5: Commit (SOLO los archivos de esta tarea)**

```bash
git add src/pages/Nosotros.jsx src/pages/Nosotros.test.jsx
git commit -m "feat: página nosotros con historia, misión, visión y valores

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

---

### Task 7: Página Servicios

**Files:**
- Create: `src/pages/Servicios.jsx`
- Modify: `src/pages/Servicios.jsx` (ya existe como stub conectado en App.jsx; reemplazarlo por completo)
- Test: `src/pages/Servicios.test.jsx`

**Interfaces:**
- Consumes: `services`, `proteja`, `painPoints` de `src/data/content.js`; `SectionHeading`.
- Produces: `src/pages/Servicios.jsx` default export: encabezado, 4 bloques de detalle (nombre, resumen, beneficios, CTA de cotización), sección "Proteja sus datos" (Veeam/Sophos), CTA final.

- [ ] **Step 1: Crear src/pages/Servicios.jsx**

```jsx
import { Link } from 'react-router-dom'
import { services, proteja } from '../data/content.js'
import SectionHeading from '../components/SectionHeading.jsx'

export default function Servicios() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white py-16 sm:py-20">
        <div className="container-site">
          <SectionHeading
            eyebrow="Nuestros servicios"
            title="Soluciones integrales para su operación"
            intro="Cuatro líneas de servicio que cubren su tecnología de punta a punta: desde la planeación hasta la protección."
            align="left"
          />
        </div>
      </section>

      <section className="section pt-8">
        <div className="container-site space-y-16">
          {services.map((s, i) => (
            <article
              key={s.slug}
              id={s.slug}
              className="grid items-center gap-10 lg:grid-cols-2"
            >
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <p className="eyebrow">{`0${i + 1}`}</p>
                <h2 className="mt-3 text-3xl font-bold text-brand-900">{s.name}</h2>
                <p className="mt-4 text-lg leading-relaxed text-slate-600">{s.summary}</p>
                <ul className="mt-6 space-y-3">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-slate-700">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/contacto" className="btn-primary mt-8">
                  Solicitar cotización
                </Link>
              </div>
              <div className="rounded-3xl bg-gradient-to-br from-brand-100 to-brand-50 p-1">
                <div className="flex aspect-[4/3] items-center justify-center rounded-[calc(1.5rem-4px)] bg-brand-50">
                  <img src="/assets/logo.png" alt="" className="h-24 w-24 rounded-xl object-contain opacity-80" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section bg-brand-900">
        <div className="container-site">
          <SectionHeading eyebrow={proteja.eyebrow} title={proteja.title} intro={proteja.intro} dark />
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {proteja.solutions.map((sol) => (
              <article key={sol.name} className="rounded-2xl border border-white/10 bg-brand-800/60 p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">{sol.tag}</p>
                <h3 className="mt-2 text-2xl font-bold text-white">{sol.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-200">{sol.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/contacto" className="btn-primary bg-accent-500 hover:bg-accent-600">
              Hablemos de su estrategia de respaldo
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Reemplazar el stub**

`src/pages/Servicios.jsx` ya existe como stub y está conectado en `src/App.jsx`. Reemplácelo por completo con el código del Step 1. NO modifique `src/App.jsx`.

- [ ] **Step 3: Escribir el test**

`src/pages/Servicios.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Servicios from './Servicios.jsx'
import { services, proteja } from '../data/content.js'

describe('Servicios', () => {
  it('muestra los 4 servicios con su resumen', () => {
    render(
      <MemoryRouter>
        <Servicios />
      </MemoryRouter>,
    )
    services.forEach((s) => {
      expect(screen.getByRole('heading', { name: s.name })).toBeInTheDocument()
      expect(screen.getByText(s.summary)).toBeInTheDocument()
    })
  })

  it('muestra Veeam y Sophos', () => {
    render(
      <MemoryRouter>
        <Servicios />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { name: 'Veeam' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Sophos' })).toBeInTheDocument()
  })
})
```

- [ ] **Step 4: Correr los tests de esta tarea**

Run: `npx vitest run src/pages/Servicios.test.jsx`
Expected: PASS (2 tests).

No ejecute la suite completa ni el dev server: las páginas hermanas se están
implementando en paralelo. La verificación visual se hace en la Tarea 9.

- [ ] **Step 5: Commit (SOLO los archivos de esta tarea)**

```bash
git add src/pages/Servicios.jsx src/pages/Servicios.test.jsx
git commit -m "feat: página de servicios con detalle y proteja sus datos

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

---

### Task 8: Página Contacto + hook de Zoho Forms

**Files:**
- Create: `src/hooks/useZohoForm.js`
- Test: `src/hooks/useZohoForm.test.js`
- Create: `src/components/contact/ContactForm.jsx`, `src/components/contact/ContactInfo.jsx`
- Test: `src/components/contact/ContactForm.test.jsx`
- Create: `src/pages/Contacto.jsx`
- Modify: `src/pages/Contacto.jsx` (ya existe como stub conectado en App.jsx; reemplazarlo por completo)

**Interfaces:**
- Consumes: `contact`, `site` de `src/data/content.js`.
- Produces: `useZohoForm()` devuelve `{ status, error, submit(data) }` con `status` ∈ `idle | loading | success | error`; `submit(data)` retorna `{ ok: boolean }`. `ContactForm` lo usa y muestra los estados.

- [ ] **Step 1: Crear src/hooks/useZohoForm.js**

```js
import { useState } from 'react'
import { contact } from '../data/content.js'

const getFormUrl = () => import.meta.env.VITE_ZOHO_FORM_URL ?? ''

export function useZohoForm() {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const submit = async (data) => {
    // Se lee en cada envío (no al importar el módulo): permite probar con
    // vi.stubEnv y que VITE_ZOHO_FORM_URL se tome del entorno en build.
    const formUrl = getFormUrl()
    if (!formUrl) {
      setStatus('error')
      setError(contact.notConfigured)
      return { ok: false }
    }
    setStatus('loading')
    setError('')
    try {
      const res = await fetch(formUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
        signal: AbortSignal.timeout(15000), // timeout de 15 s (spec §7)
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
      return { ok: true }
    } catch {
      setStatus('error')
      setError(contact.error)
      return { ok: false }
    }
  }

  return { status, error, submit }
}
```

- [ ] **Step 2: Escribir el test del hook**

`src/hooks/useZohoForm.test.js`:
```jsx
import { renderHook, act, waitFor } from '@testing-library/react'
import { useZohoForm } from './useZohoForm.js'
import { contact } from '../data/content.js'

describe('useZohoForm', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('falla con mensaje claro si no hay URL configurada', async () => {
    vi.stubEnv('VITE_ZOHO_FORM_URL', '')
    const { result } = renderHook(() => useZohoForm())
    let res
    await act(async () => {
      res = await result.current.submit({ nombre: 'Ana' })
    })
    expect(res.ok).toBe(false)
    expect(result.current.status).toBe('error')
    expect(result.current.error).toBe(contact.notConfigured)
  })

  it('envía correctamente con fetch y pasa a success', async () => {
    vi.stubEnv('VITE_ZOHO_FORM_URL', 'https://forms.zohopublic.com/org/form/Test/json/JSONString')
    const fetchMock = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetchMock)
    const { result } = renderHook(() => useZohoForm())
    let res
    await act(async () => {
      res = await result.current.submit({ nombre: 'Ana' })
    })
    expect(res.ok).toBe(true)
    expect(result.current.status).toBe('success')
    expect(fetchMock).toHaveBeenCalledWith(
      'https://forms.zohopublic.com/org/form/Test/json/JSONString',
      expect.objectContaining({ method: 'POST' }),
    )
  })

  it('falla con mensaje de error si el fetch rechaza', async () => {
    vi.stubEnv('VITE_ZOHO_FORM_URL', 'https://forms.zohopublic.com/org/form/Test/json/JSONString')
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network')))
    const { result } = renderHook(() => useZohoForm())
    let res
    await act(async () => {
      res = await result.current.submit({ nombre: 'Ana' })
    })
    expect(res.ok).toBe(false)
    expect(result.current.status).toBe('error')
    expect(result.current.error).toBe(contact.error)
  })
})
```

- [ ] **Step 3: Correr los tests del hook**

Run: `npx vitest run src/hooks/useZohoForm.test.js`
Expected: PASS (3 tests).

- [ ] **Step 4: Crear src/components/contact/ContactForm.jsx**

```jsx
import { useState } from 'react'
import { useZohoForm } from '../../hooks/useZohoForm.js'
import { contact } from '../../data/content.js'

const initialValues = { firstName: '', lastName: '', email: '', phone: '', service: '', message: '' }

function validate(values) {
  const errors = {}
  if (!values.firstName.trim()) errors.firstName = 'Ingrese su nombre'
  if (!values.lastName.trim()) errors.lastName = 'Ingrese su apellido'
  if (!values.email.trim()) {
    errors.email = 'Ingrese su correo'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Ingrese un correo válido'
  }
  if (!values.message.trim()) errors.message = 'Escriba su mensaje'
  return errors
}

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200'

// Definida fuera del componente: definirla dentro haría que los inputs
// pierdan el foco en cada tecla (React remonta el componente Field).
function Field({ name, label, required, errors, children }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {children}
      {errors[name] && (
        <p id={`${name}-error`} className="mt-1 text-xs text-red-600">
          {errors[name]}
        </p>
      )}
    </div>
  )
}

export default function ContactForm() {
  const { status, error, submit } = useZohoForm()
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    setErrors((err) => ({ ...err, [name]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const v = validate(values)
    setErrors(v)
    if (Object.keys(v).length > 0) return

    const payload = {
      'Primer Nombre': values.firstName.trim(),
      Apellido: values.lastName.trim(),
      Email: values.email.trim(),
      Teléfono: values.phone.trim(),
      Servicio: values.service,
      Mensaje: values.message.trim(),
    }
    await submit(payload)
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center" role="status">
        <p className="text-lg font-semibold text-green-800">{contact.success}</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="firstName" label={contact.form.firstName.label} required={contact.form.firstName.required} errors={errors}>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            className={inputClass}
            value={values.firstName}
            onChange={onChange}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? 'firstName-error' : undefined}
          />
        </Field>
        <Field name="lastName" label={contact.form.lastName.label} required={contact.form.lastName.required} errors={errors}>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            className={inputClass}
            value={values.lastName}
            onChange={onChange}
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={errors.lastName ? 'lastName-error' : undefined}
          />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="email" label={contact.form.email.label} required={contact.form.email.required} errors={errors}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={inputClass}
            value={values.email}
            onChange={onChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
        </Field>
        <Field name="phone" label={contact.form.phone.label} required={contact.form.phone.required} errors={errors}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            value={values.phone}
            onChange={onChange}
          />
        </Field>
      </div>
      <Field name="service" label={contact.form.service.label} required={contact.form.service.required} errors={errors}>
        <select id="service" name="service" className={inputClass} value={values.service} onChange={onChange}>
          <option value="">Seleccione una opción</option>
          {contact.services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </Field>
      <Field name="message" label={contact.form.message.label} required={contact.form.message.required} errors={errors}>
        <textarea
          id="message"
          name="message"
          rows="5"
          className={inputClass}
          value={values.message}
          onChange={onChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
      </Field>

      {status === 'error' && (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <button type="submit" disabled={status === 'loading'} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
        {status === 'loading' ? 'Enviando…' : 'Enviar'}
      </button>
    </form>
  )
}
```

- [ ] **Step 5: Crear src/components/contact/ContactInfo.jsx**

```jsx
import { site, contact } from '../../data/content.js'

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-brand-900">Información de contacto</h2>
        <p className="mt-3 text-slate-600">{contact.body}</p>
      </div>
      <ul className="space-y-4 text-sm">
        <li className="flex gap-3">
          <span className="text-accent-500" aria-hidden="true">📍</span>
          <span className="text-slate-700">{site.address}</span>
        </li>
        <li className="flex gap-3">
          <span className="text-accent-500" aria-hidden="true">📞</span>
          <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`} className="text-slate-700 transition hover:text-brand-800">
            {site.phone}
          </a>
        </li>
        <li className="flex gap-3">
          <span className="text-accent-500" aria-hidden="true">✉️</span>
          <a href={`mailto:${site.email}`} className="text-slate-700 transition hover:text-brand-800">
            {site.email}
          </a>
        </li>
      </ul>
      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <iframe
          title="Ubicación de TechWave IT Services"
          src={contact.mapEmbed}
          className="h-64 w-full"
          loading="lazy"
        />
      </div>
    </div>
  )
}
```

- [ ] **Step 6: Crear src/pages/Contacto.jsx y actualizar src/App.jsx**

`src/pages/Contacto.jsx`:
```jsx
import { contact } from '../data/content.js'
import SectionHeading from '../components/SectionHeading.jsx'
import ContactForm from '../components/contact/ContactForm.jsx'
import ContactInfo from '../components/contact/ContactInfo.jsx'

export default function Contacto() {
  return (
    <section className="section">
      <div className="container-site">
        <SectionHeading eyebrow={contact.eyebrow} title={contact.title} align="left" />
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </section>
  )
}
```

`src/pages/Contacto.jsx` ya existe como stub y está conectado en `src/App.jsx`. Reemplácelo por completo con el código de arriba. NO modifique `src/App.jsx`.

- [ ] **Step 7: Escribir el test del formulario**

`src/components/contact/ContactForm.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from './ContactForm.jsx'
import { contact } from '../../data/content.js'

describe('ContactForm', () => {
  it('muestra errores de validación al enviar vacío', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    await user.click(screen.getByRole('button', { name: 'Enviar' }))
    expect(screen.getByText('Ingrese su nombre')).toBeInTheDocument()
    expect(screen.getByText('Ingrese su apellido')).toBeInTheDocument()
    expect(screen.getByText('Ingrese su correo')).toBeInTheDocument()
    expect(screen.getByText('Escriba su mensaje')).toBeInTheDocument()
  })

  it('valida el formato del correo', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    await user.type(screen.getByLabelText(/Correo electrónico/), 'correo-invalido')
    await user.click(screen.getByRole('button', { name: 'Enviar' }))
    expect(screen.getByText('Ingrese un correo válido')).toBeInTheDocument()
  })

  it('muestra el mensaje de no configurado si falta la URL de Zoho', async () => {
    vi.stubEnv('VITE_ZOHO_FORM_URL', '')
    const user = userEvent.setup()
    render(<ContactForm />)
    await user.type(screen.getByLabelText(/Primer nombre/), 'Ana')
    await user.type(screen.getByLabelText(/Apellido/), 'Rojas')
    await user.type(screen.getByLabelText(/Correo electrónico/), 'ana@correo.com')
    await user.type(screen.getByLabelText(/Mensaje/), 'Hola, necesito una cotización')
    await user.click(screen.getByRole('button', { name: 'Enviar' }))
    expect(await screen.findByRole('alert')).toHaveTextContent(contact.notConfigured)
    vi.unstubAllEnvs()
  })
})
```

- [ ] **Step 8: Correr los tests de esta tarea**

Run: `npx vitest run src/hooks/useZohoForm.test.js src/components/contact/ContactForm.test.jsx`
Expected: PASS (6 tests).

No ejecute la suite completa ni el dev server: las páginas hermanas se están
implementando en paralelo. La verificación visual y el envío real del
formulario se verifican en la Tarea 9.

- [ ] **Step 9: Commit (SOLO los archivos de esta tarea)**

```bash
git add src/hooks/useZohoForm.js src/hooks/useZohoForm.test.js src/components/contact/ src/pages/Contacto.jsx
git commit -m "feat: página de contacto con formulario integrado a Zoho Forms

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

---

### Task 9: Pulido responsive, QA visual y revisión

**Files:**
- Posibles ajustes en: `src/index.css`, `src/components/*`, `src/pages/*` (solo si la revisión lo exige).

**Interfaces:**
- Consumes: todo lo anterior. No produce nuevas interfaces.

- [ ] **Step 1: Levantar el dev server y recorrer todas las páginas**

Run: `npm run dev` (background).
Revisar en desktop (1280px) y móvil (375px, DevTools):
1. `/` — hero sin desbordes, tarjetas en 1 columna en móvil, contadores legibles, imagen del hero centrada.
2. `/nosotros` — grid historia/misión apila en móvil.
3. `/servicios` — bloques alternados se apilan en móvil (verificar que el `order-2` no rompa el orden móvil).
4. `/contacto` — formulario y mapa apilados en móvil.
5. `/ruta-falsa` — 404.
6. Navegación móvil: abrir/cerrar menú hamburguesa en cada página.
7. `src/App.jsx` ya no usa la función `Placeholder` y las 4 rutas apuntan a las páginas reales.
8. **Consistencia entre páginas (requisito del usuario):** recorrer las 4 páginas lado a lado y verificar que comparten exactamente el mismo lenguaje visual: tarjetas (`rounded-2xl border border-slate-200 shadow-sm`), botones (`btn-primary`/`btn-secondary`), encabezados (`SectionHeading`), espaciado de secciones (`.section`), paleta (brand-800/cyan) y tipografía. Ninguna página con estilos propios divergentes.

- [ ] **Step 2: Corregir hallazgos**

Corregir cualquier desborde horizontal, texto cortado o espaciado roto encontrado en el paso 1, y unificar cualquier divergencia de estilo entre páginas encontrada en el punto 8 (debe ganar el sistema de diseño compartido: tokens, clases base, SectionHeading). Verificar que ningún texto menciona servicios fuera de la oferta (desarrollo, datos, cloud independiente).

- [ ] **Step 3: Verificación de contraste y accesibilidad básica**

Verificar que: todos los enlaces tienen texto legible, las imágenes tienen `alt` (o `alt=""` si son decorativas), los campos del formulario tienen `label` asociado, y el contraste de texto sobre `brand-800`/`brand-900` es blanco.

- [ ] **Step 4: Correr todos los tests**

Run: `npm test`
Expected: PASS (todos).

- [ ] **Step 5: Commit de ajustes (si hubo cambios)**

```bash
git add -A
git commit -m "fix: ajustes responsive y de accesibilidad

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

Si no hubo cambios, omitir el commit.

---

### Task 10: Build de producción, documentación de despliegue y entrega

**Files:**
- Create: `README.md`
- Modify: nada de código salvo si `npm run build` falla.

**Interfaces:**
- Consumes: todo. Produce: `dist/` verificada y README con pasos de despliegue.

- [ ] **Step 1: Build de producción**

Run: `npm run build`
Expected: termina sin errores y genera `dist/`.

- [ ] **Step 2: Verificar el build**

Run: `npm run preview` (background). Abrir http://localhost:4173/ y verificar que las 4 rutas cargan (el preview de Vite incluye fallback SPA). Verificar consola sin errores. Detener el server.

- [ ] **Step 3: Crear README.md**

```markdown
# TechWave IT Services — Sitio web

Sitio estático en React (Vite + Tailwind CSS) para TechWave IT Services.
Oferta: Tecnología, Infraestructura, Consultoría y Ciberseguridad.

## Desarrollo local

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # vitest
```

## Editar contenido

Todo el contenido vive en `src/data/content.js`. Las cifras marcadas con
`// CIFRAS POR CONFIRMAR` son placeholders: reemplácelas con los datos reales.

## Formulario de contacto (Zoho Forms)

1. En Zoho Forms, cree o abra el formulario de contacto.
2. Copie la URL de webhook JSONString:
   `https://forms.zohopublic.com/<organizacion>/form/<Nombre>/json/JSONString`
3. Cree un archivo `.env` local (copiando `.env.example`) con:
   `VITE_ZOHO_FORM_URL=<url del webhook>`
4. En Cloudflare Pages, agregue la misma variable en
   Settings → Environment variables.
5. Verifique que el formulario de Zoho permite envíos desde otros orígenes
   (CORS). Si el envío falla por CORS, use la opción de incrustar el formulario
   de Zoho en la página de contacto.

## Despliegue en Cloudflare Pages (plan free) desde GitHub

1. Suba este repositorio a GitHub (`git remote add origin ... && git push`).
2. En Cloudflare: Workers & Pages → Create → Pages → Connect to Git.
3. Seleccione el repositorio y configure:
   - Build command: `npm run build`
   - Build output directory: `dist`
4. El archivo `public/_redirects` ya incluye el fallback SPA (`/* /index.html 200`).
5. Deploy: cada push a la rama principal publica automáticamente.
6. Dominio propio: en el proyecto, Custom domains → agregar
   `techwaveitservices.com` y actualizar los DNS en el registrador.

## Estructura

- `src/pages/` — una por ruta (Home, Nosotros, Servicios, Contacto)
- `src/components/` — componentes reutilizables y por área (home/, contact/)
- `src/data/content.js` — todos los textos del sitio
- `src/hooks/useZohoForm.js` — lógica de envío del formulario
- `public/assets/` — imágenes de marca
```

- [ ] **Step 4: Commit final**

```bash
git add -A
git commit -m "docs: readme con instrucciones de desarrollo y despliegue

Co-Authored-By: Claude Code <noreply@anthropic.com>"
```

- [ ] **Step 5: Resumen de verificación final**

Run: `npm test && npm run build`
Expected: tests PASS y build OK.

---

## Notas de ejecución multi-agente

- Las Tareas 1 → 2 → 3 → 4 son secuenciales (dependencias).
- ANTES de lanzar las Tareas 5–8 en paralelo, el controlador crea stubs de las
  4 páginas, conecta `src/App.jsx` (las 4 rutas reales, sin `Placeholder`) y
  hace un commit. Así ningún agente paralelo toca `src/App.jsx`.
- Las Tareas 5, 6, 7, 8 son **paralelizables**: cada una reemplaza SOLO su stub
  (`src/pages/X.jsx`) y crea sus componentes y tests. Cada agente corre SOLO
  sus tests (`npx vitest run <su archivo>`) y hace `git add` SOLO de sus rutas
  — nunca `git add -A`, nunca la suite completa, nunca el dev server.
- Las Tareas 9 y 10 son secuenciales al final (integración + QA + build):
  Tarea 9 corre la suite completa y verifica visualmente las 4 páginas.
