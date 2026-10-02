import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Servicios from './Servicios.jsx'
import { services, servicesPage, proteja, allies } from '../data/content.js'

describe('Servicios', () => {
  it('muestra los 4 servicios con su resumen y su imagen', () => {
    render(
      <MemoryRouter>
        <Servicios />
      </MemoryRouter>,
    )
    services.forEach((s) => {
      expect(screen.getByRole('heading', { name: s.name })).toBeInTheDocument()
      expect(screen.getByText(s.summary)).toBeInTheDocument()
      expect(screen.getByRole('img', { name: s.name })).toBeInTheDocument()
    })
  })

  it('cada servicio pide cotización con el servicio preseleccionado', () => {
    render(
      <MemoryRouter>
        <Servicios />
      </MemoryRouter>,
    )
    const links = screen.getAllByRole('link', { name: servicesPage.cta.label })
    expect(links.map((a) => a.getAttribute('href'))).toEqual(services.map((s) => `/contacto?servicio=${s.slug}`))
  })

  it('proteja sus datos muestra los 5 fabricantes aliados con su logo', () => {
    render(
      <MemoryRouter>
        <Servicios />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { name: proteja.title })).toBeInTheDocument()
    expect(allies.items).toHaveLength(5)
    allies.items.forEach((ally) => {
      expect(screen.getByRole('heading', { name: ally.name })).toBeInTheDocument()
      expect(screen.getByRole('img', { name: ally.name })).toBeInTheDocument()
    })
  })
})
