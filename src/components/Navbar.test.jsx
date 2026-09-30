import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import { nav } from '../data/content.js'

function renderNavbar() {
  return render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  )
}

describe('Navbar', () => {
  it('muestra los 4 enlaces de navegación', () => {
    renderNavbar()
    nav.items.forEach((item) => {
      expect(screen.getAllByText(item.label).length).toBeGreaterThan(0)
    })
  })

  it('abre el menú móvil al hacer clic', async () => {
    const user = userEvent.setup()
    renderNavbar()
    await user.click(screen.getByRole('button', { name: nav.menuOpen }))
    expect(screen.getByRole('button', { name: nav.menuClose })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getAllByText(nav.items[0].label).length).toBe(2)
  })
})
