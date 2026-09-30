import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App.jsx'
import { nav, footer, notFound } from './data/content.js'
import { mockIntersectionObserver } from './test/mockIntersectionObserver.js'

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

// Home y Nosotros incluyen la sección Counters, que usa IntersectionObserver.
beforeAll(() => {
  mockIntersectionObserver()
})

afterAll(() => {
  vi.unstubAllGlobals()
})

describe('App routes', () => {
  it.each(['/', '/nosotros', '/servicios', '/contacto'])(
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
  })
})
