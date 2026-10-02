import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home.jsx'
import { hero, services, serviceCards, counters, proteja } from '../data/content.js'
import { mockIntersectionObserver } from '../test/mockIntersectionObserver.js'

beforeAll(() => {
  mockIntersectionObserver()
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

  it('cada tarjeta de servicio lleva a su sección en Servicios', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )
    const links = screen.getAllByRole('link', { name: serviceCards.linkLabel })
    expect(links.map((a) => a.getAttribute('href'))).toEqual(services.map((s) => `/servicios#${s.slug}`))
  })

  it('no repite las cifras ni las soluciones de respaldo', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )
    expect(screen.queryByText(counters.title)).not.toBeInTheDocument()
    expect(screen.queryByText(proteja.title)).not.toBeInTheDocument()
  })
})
