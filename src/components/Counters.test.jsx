import { render, screen } from '@testing-library/react'
import Counters from './Counters.jsx'
import { counters } from '../data/content.js'

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
    counters.items.forEach((c) => {
      expect(screen.getByText(c.label)).toBeInTheDocument()
    })
  })
})
