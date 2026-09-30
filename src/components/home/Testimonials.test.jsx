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

// getAllByRole no devuelve los figure con aria-hidden, así que leemos el DOM directo
const slidesOf = (container) => Array.from(container.querySelectorAll('figure'))

describe('Testimonials', () => {
  it('renderiza las 3 citas de clientes con su autor', () => {
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

    // Desde la primera, "anterior" envuelve a la última
    fireEvent.click(prev)
    expect(slides[2]).toHaveAttribute('aria-hidden', 'false')
  })

  it('salta a un testimonio concreto con los puntos', () => {
    const { container } = render(<Testimonials />)
    const dot = screen.getByRole('button', { name: `${testimonials.dotLabel} 3` })
    fireEvent.click(dot)
    const slides = slidesOf(container)
    expect(slides[2]).toHaveAttribute('aria-hidden', 'false')
    expect(dot).toHaveAttribute('aria-current', 'true')
  })
})
