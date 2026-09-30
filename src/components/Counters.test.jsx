import { render, screen } from '@testing-library/react'
import Counters from './Counters.jsx'
import { counters } from '../data/content.js'
import { mockIntersectionObserver } from '../test/mockIntersectionObserver.js'

beforeAll(() => {
  mockIntersectionObserver()
})

afterAll(() => {
  vi.unstubAllGlobals()
})

describe('Counters', () => {
  it('renderiza los 4 contadores con sus etiquetas', () => {
    render(<Counters />)
    expect(counters.items).toHaveLength(4)
    counters.items.forEach((c) => {
      expect(screen.getByText(c.label)).toBeInTheDocument()
    })
  })
})
