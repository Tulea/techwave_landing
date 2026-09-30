import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App.jsx'

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('App routes', () => {
  it.each(['/', '/nosotros', '/servicios', '/contacto'])(
    'renderiza %s con el layout (navbar y footer)',
    (path) => {
      renderAt(path)
      expect(screen.getByRole('navigation', { name: 'Principal' })).toBeInTheDocument()
      expect(screen.getByText(/Todos los derechos reservados/)).toBeInTheDocument()
    },
  )
})
