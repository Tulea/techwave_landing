# Diseño: Sitio web TechWave IT Services (React estático)

- **Fecha**: 2026-09-29
- **Estado**: Aprobado por el usuario (enfoque A — "Confianza corporativa")
- **Directorio**: `C:\Users\tulea\Desktop\Nueva pagina TechWave`

## 1. Objetivo

Rediseño moderno de https://www.techwaveitservices.com/ como sitio estático en React,
alineado con la nueva imagen de marca. La empresa ofrece únicamente cuatro líneas:
**Tecnología, Infraestructura, Consultoría y Ciberseguridad**. Se eliminan desarrollo
de software, gestión de datos y soluciones cloud como oferta independiente.

## 2. Decisiones aprobadas con el usuario

- **Estructura**: multi-página con React Router (Inicio, Nosotros, Servicios, Contacto).
- **Stack**: Vite + React + Tailwind CSS. Sin backend.
- **Formulario**: POST directo del navegador al webhook de **Zoho Forms** (Zoho One).
- **Contenido**: redactado en español, tono formal ("usted"), adaptado del sitio actual
  y de las mejores secciones de los sitios de referencia (Solución Segura, Deloitte CR,
  Grupo Sega). Archivo central de contenido para edición posterior.
- **Marca**: `Logos/3.png` como imagen principal (favicon + hero); los SVG de
  `./Sitio web` complementan (logo con wordmark). Paleta principal morado profundo
  `#31285d` + acento cyan.
- **Sin sección de equipo ni firmas** (decisión explícita del usuario).
- **Despliegue objetivo**: Cloudflare Pages plan free con integración GitHub
  (deploy automático por push).

## 3. Arquitectura

```
/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── package.json
├── .env.example            # VITE_ZOHO_FORM_URL=<webhook zoho forms>
├── public/
│   ├── _redirects          # /* /index.html 200  (fallback SPA para Cloudflare)
│   └── assets/             # imágenes de marca (Logos/3.png, Sitio web/*)
└── src/
    ├── main.jsx            # ReactDOM + BrowserRouter
    ├── App.jsx             # Layout: Navbar + Routes + Footer
    ├── index.css           # Tailwind + tokens de marca
    ├── data/
    │   ├── contenido.json  # TODOS los textos (archivo de texto editable)
    │   └── content.js      # re-export delgado de contenido.json
    ├── hooks/
    │   └── useZohoForm.js  # lógica de envío del formulario
    ├── components/         # Navbar, Footer, Hero, QuickLinks, ServiceCard,
    │                       # Stats, LogoWall, Counters, Testimonials, CTA, Form...
    └── pages/
        ├── Home.jsx        # /
        ├── Nosotros.jsx    # /nosotros
        ├── Servicios.jsx   # /servicios
        └── Contacto.jsx    # /contacto
```

- Datos centralizados en `src/data/contenido.json` (archivo de texto plano,
  editable por el usuario sin tocar código): editar contenido no requiere tocar
  componentes; `content.js` solo lo re-exporta.
- Formulario: `fetch POST` a `VITE_ZOHO_FORM_URL` (webhook de Zoho Forms en modo
  JSONString). Sin servidor intermedio.
- Build estático a `dist/`. Ruta 404 custom (NotFound) + fallback SPA en
  `_redirects` para Cloudflare Pages.

## 4. Páginas y secciones

### Inicio (`/`)
1. **Hero**: posicionamiento ("Aliado estratégico en tecnología, infraestructura,
   consultoría y ciberseguridad") + 3 cifras reales (años de operación, clientes,
   servicios gestionados) + CTA "Assessment gratis" y "Contáctenos".
2. **Franja de accesos rápidos**: Assessment gratis · Solicitar cotización ·
   Contáctenos.
3. **Quiénes somos (breve)**: aliado estratégico, equipo certificado, atención
   personalizada.
4. **Dolor de negocio**: 4 tarjetas con estadísticas que los servicios resuelven
   (costo de brechas de seguridad, downtime, infraestructura anticuada, decisiones
   sin visibilidad).
5. **Servicios**: 4 tarjetas — Tecnología, Infraestructura, Consultoría,
   Ciberseguridad — con enlace a `/servicios`.
6. **Proteja sus datos**: bloque destacando Veeam (respaldo y recuperación) y
   Sophos (protección de endpoints/red).
7. **Alianzas**: muro de logos de fabricantes socios.
8. **Trayectoria**: contadores animados (años, proyectos, clientes, disponibilidad).
9. **Testimonios**: el actual de Salvador Hernández (Vivibanco) + estructura lista
   para agregar más.
10. **CTA final**: contacto + teléfono (estilo "¿Tiene una emergencia?").

### Nosotros (`/nosotros`)
- Historia, misión/visión, valores, certificaciones y alianzas.
- **Sin** sección de equipo ni firmas.

### Servicios (`/servicios`)
- Detalle de los 4 servicios con beneficios y CTA de cotización por servicio.
- Bloque "Proteja sus datos" (Veeam/Sophos) como parte de infraestructura y
  ciberseguridad.

### Contacto (`/contacto`)
- Formulario → Zoho Forms: nombre, apellido, email, teléfono, servicio de interés,
  mensaje.
- Datos: San Rafael, Alajuela · +506 7128-7960 · info@techwaveitservices.com.
- Mapa embebido (OpenStreetMap, sin claves de API).

## 5. Diseño visual

- **Paleta**: morado profundo `#31285d` (principal, del logo), cyan `#06b6d4`
  (acento), neutros claros para fondo corporativo. Tema claro.
- **Tipografía**: Inter (títulos + cuerpo); pesos 400–800.
- **Componentes reutilizables**: botones (primario/secundario), tarjetas con hover,
  badges de sección, contadores animados (IntersectionObserver), logo wall.
- **Responsive**: mobile-first, menú hamburguesa en móvil.
- Sin dark mode (no requerido).

## 6. Contenido a redactar (src/data/contenido.json)

- Posicionamiento y cifras del hero (cifras reales por confirmar con el cliente;
  placeholders claros mientras tanto).
- Descripciones de los 4 servicios (2–4 líneas cada uno + beneficios).
- Estadísticas de dolor de negocio (con fuentes genéricas de la industria).
- Nosotros: historia, misión, visión, valores.
- Textos de Veeam/Sophos.
- Testimonio de Vivibanco (adaptado del sitio actual).
- Textos de contacto, footer y microcopy del formulario.

## 7. Manejo de errores y estados

- **Formulario**: estados `idle | loading | success | error`; validación client-side
  (email, campos requeridos); timeout del fetch; mensaje claro si
  `VITE_ZOHO_FORM_URL` no está configurada; el botón se deshabilita durante el envío.
- **Ruta inexistente**: página 404 con enlace a inicio.
- **Imágenes**: `alt` descriptivos; el layout no se rompe si una imagen falta.

## 8. Pruebas

1. `npm run dev`: recorrer las 4 páginas en desktop y móvil.
2. Probar el formulario contra una URL de prueba (verificar CORS del webhook Zoho;
   si el webhook no permite CORS, plan B documentado: `<form action>` nativo que
   navega a Zoho o iframe embebido — se decide con la URL real).
3. `npm run build` + `npm run preview`: verificar build de producción y rutas.
4. Revisión visual de contraste/espaciado y Lighthouse básico.

## 9. Despliegue (Cloudflare Pages free + GitHub)

1. `git init` del proyecto y push a un repositorio de GitHub (privado o público).
2. En Cloudflare: Pages → Create project → Connect to Git → seleccionar repo.
3. Config: framework **Vite**, build command `npm run build`, output `dist`.
4. `_redirects` incluido en `public/` para el fallback SPA.
5. Cada push a main despliega automáticamente. Plan free: 500 builds/mes,
   ancho de banda ilimitado, SSL y dominio propio.

## 10. Estrategia de implementación multi-agente

Se usará la skill `superpowers:dispatching-parallel-agents` con agentes en paralelo:
1. **Agente base**: scaffolding Vite+Tailwind, tokens de marca, layout (Navbar,
   Footer), rutas, assets de marca procesados.
2. **Agente páginas**: Home + Nosotros.
3. **Agente servicios/contacto**: Servicios + Contacto + hook useZohoForm.
4. **Agente contenido**: redacción de `src/data/content.js` (copy en español).
Luego: integración, revisión de código (requesting-code-review), verificación visual
y build de producción.

## 11. Fuera de alcance

- Sección de equipo, firmas o personas.
- Oferta de desarrollo de software, gestión de datos o cloud independiente.
- Backend propio, CMS, blog, multi-idioma.
- OAuth de Zoho (se usa webhook público de Zoho Forms).
