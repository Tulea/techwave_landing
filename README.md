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

Todos los textos del sitio viven en UN solo archivo: `src/data/contenido.json`
(texto plano en JSON, legible y editable sin conocimientos de código). Para
cambiar cualquier texto — menú, copyright, secciones, formulario — edite ese
archivo, guarde y haga push: Cloudflare reconstruye y publica el cambio
automáticamente. Si el JSON queda mal formado, el build falla y el sitio
publicado sigue intacto.

### Versión en inglés

El sitio tiene un botón **ES / EN** en el menú. Los textos en inglés viven en
`src/data/contenido.en.json`, con la MISMA estructura que `contenido.json`.
Si agrega o cambia un texto en español, haga el cambio equivalente en inglés;
`npm test` avisa si las dos estructuras no coinciden. El idioma elegido se
recuerda en el navegador del visitante.

### SEO

- Título y descripción de cada página: `contenido.json` → `seo`.
- Vista previa al compartir (Open Graph), datos estructurados de negocio local
  (JSON-LD), `sitemap.xml` y `robots.txt` se generan solos en el build a partir
  de `contenido.json` → `site`.
- `public/_redirects` redirige (301) las URLs del sitio anterior en Wix a las
  nuevas, para no perder posicionamiento. Agregue ahí cualquier URL vieja que
  falte, siempre ARRIBA de la última línea (`/* /index.html 200`).
- Tras publicar: registre el sitio en Google Search Console y envíe
  `https://www.techwaveitservices.com/sitemap.xml`.

## Trabaja con nosotros (Zoho Forms con CV adjunto)

La página `/trabaja-con-nosotros` envía la postulación y el CV directamente a
Zoho Forms (incluido en Zoho One), que reenvía cada una por correo a
info@techwaveitservices.com con el CV adjunto. No requiere API key.

1. En Zoho Forms, cree el formulario **Postulaciones** con estos campos, en
   este orden: Nombre (tipo *Name*), Correo (*Email*), Teléfono (*Phone*),
   Puesto o área (*Single Line*), Mensaje (*Multi Line*) y CV (*File Upload*,
   tipos PDF/DOC/DOCX, máximo 5 MB).
2. Publish → Embed → **HTML / Source code**. Copie la URL del atributo
   `action` del `<form>` (termina en `/htmlRecords/submit`) y guárdela como
   `VITE_ZOHO_CAREERS_URL` en `.env` y en Cloudflare Pages.
3. En ese mismo código, confirme que los `name` de los campos son
   `Name_First`, `Name_Last`, `Email`, `PhoneNumber_countrycode`,
   `SingleLine`, `MultiLine` y `FileUpload`. Si alguno es distinto, cámbielo
   en `ZOHO_FIELDS` dentro de `src/components/CareersForm.jsx`.
4. Settings → After Submission → **Redirect to URL**:
   `https://www.techwaveitservices.com/trabaja-con-nosotros?enviado=1#postular`
5. Settings → Notifications → **Email**: destinatario
   `info@techwaveitservices.com`, con la opción de adjuntar los archivos
   subidos activada.

Las vacantes se publican en `contenido.json` → `careers.openings`, por ejemplo:
`{ "title": "Analista SOC", "area": "Ciberseguridad", "mode": "Híbrido", "location": "San José", "description": "…" }`
(y su traducción en `contenido.en.json`). Sin vacantes, la página invita a
enviar el CV igualmente.

## Analítica (Cloudflare Web Analytics, gratis)

Opción A (más simple): en Cloudflare → Workers & Pages → el proyecto →
Metrics → **Web Analytics → Enable**. No requiere tocar el código.

Opción B (por variable): Cloudflare → Analytics & Logs → Web Analytics →
Add a site → copie el token y créelo en Cloudflare Pages como
`VITE_CF_ANALYTICS_TOKEN`. Sin la variable no se carga ningún script.

## WhatsApp, privacidad y redes

- Botón flotante de WhatsApp: número y mensaje en `contenido.json` →
  `site.whatsapp` (`wa.me`, sin API ni costo).
- Política de privacidad (Ley 8968): página `/privacidad`, textos en
  `contenido.json` → `privacy`. El formulario exige aceptar la política.
- LinkedIn del footer: `contenido.json` → `site.social.linkedin`.

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

## Despliegue en Cloudflare (plan free) desde GitHub

El sitio se publica como archivos estáticos (`dist`). Funciona tanto como
Worker como en Pages:

- **Workers** (Workers & Pages → Create → Import a repository): build command
  `npm run build`, deploy command `npx wrangler deploy`. La configuración está
  en `wrangler.jsonc` (sirve `dist` y resuelve las rutas de React).
- **Pages** (Workers & Pages → Create → Pages → Connect to Git): build command
  `npm run build`, output directory `dist`.

Conecte el proyecto directamente al repositorio `Tulea/techwave_landing`
(no a una copia) para que cada push a `main` publique automáticamente. Las
redirecciones 301 del sitio anterior están en `public/_redirects`.

Dominio propio: en el proyecto, Custom domains → agregar
`techwaveitservices.com`.

## Estructura

- `src/pages/` — una por ruta (Home, Nosotros, Servicios, Contacto)
- `src/components/` — componentes reutilizables y por área (home/, contact/)
- `src/data/contenido.json` — todos los textos del sitio (archivo editable); `content.js` solo lo re-exporta
- `src/hooks/useZohoForm.js` — lógica de envío del formulario
- `public/assets/` — imágenes de marca
