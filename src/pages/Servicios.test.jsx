import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Servicios from './Servicios.jsx'
import { services, proteja } from '../data/content.js'

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

  it('muestra las soluciones de respaldo', () => {
    render(
      <MemoryRouter>
        <Servicios />
      </MemoryRouter>,
    )
    proteja.solutions.forEach((sol) => {
      expect(screen.getByRole('heading', { name: sol.name })).toBeInTheDocument()
    })
  })
})
