import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Footer from './Footer.jsx'
import { site, footer, nav, services } from '../data/content.js'

describe('Footer', () => {
  it('renderiza las columnas de enlaces, servicios y contacto', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )
    const linksNav = screen.getByRole('navigation', { name: footer.links })
    nav.items.forEach((i) => {
      expect(within(linksNav).getByText(i.label)).toBeInTheDocument()
    })
    const servicesNav = screen.getByRole('navigation', { name: footer.services })
    services.forEach((s) => {
      expect(within(servicesNav).getByText(s.name)).toBeInTheDocument()
    })
    expect(screen.getByRole('heading', { name: footer.contact })).toBeInTheDocument()
    expect(screen.getByText(site.email)).toBeInTheDocument()
    expect(screen.getByText(site.phone)).toBeInTheDocument()
  })

  it('muestra el año actual calculado dinámicamente en el copyright', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )
    const year = new Date().getFullYear()
    expect(screen.getByText(`© ${year} ${site.name}. ${footer.rights}`)).toBeInTheDocument()
  })
})
