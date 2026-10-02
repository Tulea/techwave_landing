import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from './App.jsx'
import { LanguageProvider, dictionaries } from './i18n.jsx'
import { mockIntersectionObserver } from './test/mockIntersectionObserver.js'

const { es, en } = dictionaries

function shape(value, prefix = '') {
  if (Array.isArray(value)) {
    return [`${prefix}[${value.length}]`, ...value.flatMap((v, i) => shape(v, `${prefix}[${i}]`))]
  }
  if (value && typeof value === 'object') {
    return Object.keys(value)
      .sort()
      .flatMap((k) => [`${prefix}.${k}`, ...shape(value[k], `${prefix}.${k}`)])
  }
  return []
}

beforeAll(() => {
  mockIntersectionObserver()
})

afterAll(() => {
  vi.unstubAllGlobals()
})

beforeEach(() => {
  localStorage.clear()
})

describe('i18n', () => {
  it('contenido.en.json tiene exactamente la misma estructura que contenido.json', () => {
    expect(shape(en)).toEqual(shape(es))
  })

  it('cambia el sitio a inglés y de vuelta a español con el botón de idioma', async () => {
    const user = userEvent.setup()
    render(
      <LanguageProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </LanguageProvider>,
    )
    expect(screen.getByRole('heading', { level: 1, name: es.hero.title })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: es.language.switchAria }))
    expect(screen.getByRole('heading', { level: 1, name: en.hero.title })).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('en')
    expect(document.title).toBe(en.seo.home.title)
    expect(localStorage.getItem('techwave-lang')).toBe('en')

    await user.click(screen.getByRole('button', { name: en.language.switchAria }))
    expect(screen.getByRole('heading', { level: 1, name: es.hero.title })).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('es')
  })

  it('recuerda el idioma elegido en visitas anteriores', () => {
    localStorage.setItem('techwave-lang', 'en')
    render(
      <LanguageProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </LanguageProvider>,
    )
    expect(screen.getByRole('heading', { level: 1, name: en.hero.title })).toBeInTheDocument()
  })
})
