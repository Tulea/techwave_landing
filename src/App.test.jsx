import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App.jsx'
import { nav, footer, notFound, privacy, seo, site, painPoints, cases, industries, careers } from './data/content.js'
import { mockIntersectionObserver } from './test/mockIntersectionObserver.js'

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

beforeAll(() => {
  mockIntersectionObserver()
})

afterAll(() => {
  vi.unstubAllGlobals()
})

describe('App routes', () => {
  it.each(['/', '/nosotros', '/servicios', '/contacto', '/privacidad', '/trabaja-con-nosotros'])(
    'renderiza %s con el layout (navbar y footer)',
    (path) => {
      renderAt(path)
      expect(screen.getByRole('navigation', { name: nav.ariaLabel })).toBeInTheDocument()
      expect(screen.getByText(new RegExp(footer.rights))).toBeInTheDocument()
    },
  )

  it('renderiza la página 404 en una ruta desconocida', () => {
    renderAt('/ruta-falsa')
    expect(screen.getByRole('heading', { name: notFound.title })).toBeInTheDocument()
    expect(screen.getByText(notFound.body)).toBeInTheDocument()
    expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex')
  })

  it.each([
    ['/', 'home'],
    ['/nosotros', 'nosotros'],
    ['/servicios', 'servicios'],
    ['/contacto', 'contacto'],
    ['/privacidad', 'privacidad'],
    ['/trabaja-con-nosotros', 'trabaja'],
  ])('%s tiene su propio título y descripción', (path, key) => {
    renderAt(path)
    expect(document.title).toBe(seo[key].title)
    expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute('content', seo[key].description)
    expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute('href', `${site.url}${path}`)
  })

  it('la página de privacidad muestra todas sus secciones y el footer la enlaza', () => {
    renderAt('/privacidad')
    expect(screen.getByRole('heading', { level: 1, name: privacy.title })).toBeInTheDocument()
    privacy.sections.forEach((s) => {
      expect(screen.getByRole('heading', { name: s.title })).toBeInTheDocument()
    })
    expect(screen.getByRole('link', { name: footer.privacy })).toHaveAttribute('href', '/privacidad')
  })

  it('trabaja con nosotros está enlazada en el footer y tiene el formulario de postulación', () => {
    renderAt('/trabaja-con-nosotros')
    expect(screen.getByRole('heading', { level: 1, name: careers.title })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: footer.careers })).toHaveAttribute('href', '/trabaja-con-nosotros')
    expect(screen.getByRole('button', { name: careers.form.submit })).toBeInTheDocument()
  })

  it('muestra la confirmación cuando Zoho redirige con enviado=1', () => {
    renderAt('/trabaja-con-nosotros?enviado=1')
    expect(screen.getByRole('status')).toHaveTextContent(careers.form.success)
  })

  it('muestra el botón flotante de WhatsApp con el número y mensaje', () => {
    renderAt('/')
    const link = screen.getByRole('link', { name: site.whatsapp.label })
    expect(link.getAttribute('href')).toBe(
      `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(site.whatsapp.message)}`,
    )
  })

  it('la portada cita la fuente de cada estadística y muestra los casos de éxito', () => {
    renderAt('/')
    painPoints.cards.forEach((c) => {
      expect(c.source).toBeTruthy()
      expect(c.sourceUrl).toMatch(/^https:\/\//)
    })
    expect(screen.getAllByRole('link', { name: painPoints.cards[0].source }).length).toBeGreaterThan(0)
    cases.items.forEach((c) => {
      expect(screen.getByRole('heading', { name: c.client })).toBeInTheDocument()
    })
  })

  it('servicios incluye la sección de industrias', () => {
    renderAt('/servicios')
    industries.items.forEach((i) => {
      expect(screen.getByRole('heading', { name: i.name })).toBeInTheDocument()
    })
  })
})
