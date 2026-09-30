import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Nosotros from './Nosotros.jsx'
import { about } from '../data/content.js'

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

describe('Nosotros', () => {
  it('muestra misión, visión y los 4 valores', () => {
    render(
      <MemoryRouter>
        <Nosotros />
      </MemoryRouter>,
    )
    expect(screen.getByText('Misión')).toBeInTheDocument()
    expect(screen.getByText('Visión')).toBeInTheDocument()
    about.values.forEach((v) => {
      expect(screen.getByRole('heading', { name: v.name })).toBeInTheDocument()
    })
  })
})
