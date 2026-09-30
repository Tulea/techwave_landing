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
automáticamente. La clave `_notas` dentro del JSON explica qué cifras son
placeholders por confirmar. Si el JSON queda mal formado, el build falla y el
sitio publicado sigue intacto.

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
- `src/data/contenido.json` — todos los textos del sitio (archivo editable); `content.js` solo lo re-exporta
- `src/hooks/useZohoForm.js` — lógica de envío del formulario
- `public/assets/` — imágenes de marca
