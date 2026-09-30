import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home.jsx'
import { hero, services } from '../data/content.js'

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
})
