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
