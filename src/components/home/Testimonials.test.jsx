import { render, screen, fireEvent } from '@testing-library/react'
import Testimonials from './Testimonials.jsx'
import { testimonials } from '../../data/content.js'
import { mockIntersectionObserver } from '../../test/mockIntersectionObserver.js'

beforeAll(() => {
  mockIntersectionObserver()
})

afterAll(() => {
  vi.unstubAllGlobals()
})

const slidesOf = (container) => Array.from(container.querySelectorAll('figure'))
const last = testimonials.items.length - 1

describe('Testimonials', () => {
  it('hay al menos 2 testimonios para que el carrusel tenga sentido', () => {
    expect(testimonials.items.length).toBeGreaterThanOrEqual(2)
  })

  it('renderiza todas las citas de clientes con su autor', () => {
    render(<Testimonials />)
    testimonials.items.forEach((t) => {
      expect(screen.getByText(`“${t.quote}”`)).toBeInTheDocument()
      expect(screen.getByText(t.author)).toBeInTheDocument()
    })
  })

  it('avanza y retrocede con las flechas, con vuelta circular', () => {
    const { container } = render(<Testimonials />)
    const next = screen.getByRole('button', { name: testimonials.nextLabel })
    const prev = screen.getByRole('button', { name: testimonials.prevLabel })
    const slides = slidesOf(container)

    expect(slides[0]).toHaveAttribute('aria-hidden', 'false')
    expect(slides[1]).toHaveAttribute('aria-hidden', 'true')

    fireEvent.click(next)
    expect(slides[1]).toHaveAttribute('aria-hidden', 'false')
    expect(slides[0]).toHaveAttribute('aria-hidden', 'true')

    fireEvent.click(prev)
    expect(slides[0]).toHaveAttribute('aria-hidden', 'false')

    fireEvent.click(prev)
    expect(slides[last]).toHaveAttribute('aria-hidden', 'false')
  })

  it('salta a un testimonio concreto con los puntos', () => {
    const { container } = render(<Testimonials />)
    const dot = screen.getByRole('button', { name: `${testimonials.dotLabel} ${last + 1}` })
    fireEvent.click(dot)
    const slides = slidesOf(container)
    expect(slides[last]).toHaveAttribute('aria-hidden', 'false')
    expect(dot).toHaveAttribute('aria-current', 'true')
  })
})
