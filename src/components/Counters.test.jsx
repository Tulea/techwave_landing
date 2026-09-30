import { render, screen } from '@testing-library/react'
import Counters from './Counters.jsx'

// jsdom no implementa IntersectionObserver: se mockea como inView=true de inmediato.
class MockObserver {
  constructor(cb) {
    this.cb = cb
  }
  observe(el) {
    this.cb([{ isIntersecting: true }])
  }
  disconnect() {}
}

beforeAll(() => {
  vi.stubGlobal('IntersectionObserver', MockObserver)
})

afterAll(() => {
  vi.unstubAllGlobals()
})

describe('Counters', () => {
  it('renderiza los 4 contadores con sus etiquetas', () => {
    render(<Counters />)
    expect(screen.getByText('Años de experiencia')).toBeInTheDocument()
    expect(screen.getByText('Clientes atendidos')).toBeInTheDocument()
    expect(screen.getByText('Líneas de servicio')).toBeInTheDocument()
    expect(screen.getByText('Disponibilidad de soporte')).toBeInTheDocument()
  })
})
