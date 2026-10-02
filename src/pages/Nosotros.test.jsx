import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Nosotros from './Nosotros.jsx'
import { about, allies } from '../data/content.js'
import { mockIntersectionObserver } from '../test/mockIntersectionObserver.js'

beforeAll(() => {
  mockIntersectionObserver()
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
    expect(screen.getByText(about.missionTitle)).toBeInTheDocument()
    expect(screen.getByText(about.visionTitle)).toBeInTheDocument()
    about.values.forEach((v) => {
      expect(screen.getByRole('heading', { name: v.name })).toBeInTheDocument()
    })
  })

  it('muestra los 5 fabricantes con su logo y lo que hacemos con cada uno', () => {
    render(
      <MemoryRouter>
        <Nosotros />
      </MemoryRouter>,
    )
    expect(allies.items).toHaveLength(5)
    allies.items.forEach((item) => {
      expect(screen.getByRole('img', { name: item.name })).toBeInTheDocument()
      expect(screen.getByText(item.body)).toBeInTheDocument()
    })
  })
})
