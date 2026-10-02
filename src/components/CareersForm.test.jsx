import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CareersForm, { ZOHO_FIELDS } from './CareersForm.jsx'
import { careers, contact } from '../data/content.js'

const t = careers.form
const label = (text) => screen.getByLabelText(text, { exact: false })
const pdf = (size = 1000) => new File([new Uint8Array(size)], 'cv.pdf', { type: 'application/pdf' })

async function fillValid(user) {
  await user.type(label(t.firstName), 'Ana')
  await user.type(label(t.lastName), 'Rojas')
  await user.type(label(t.email), 'ana@correo.com')
  await user.type(label(t.position), 'Ciberseguridad')
  await user.upload(label(t.cv), pdf())
  await user.click(screen.getByRole('checkbox'))
}

describe('CareersForm', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('muestra todos los errores al enviar vacío', async () => {
    const user = userEvent.setup()
    render(<CareersForm />)
    await user.click(screen.getByRole('button', { name: t.submit }))
    for (const msg of [
      t.errors.firstName,
      t.errors.lastName,
      t.errors.emailRequired,
      t.errors.position,
      t.errors.cvRequired,
      contact.form.consent.error,
    ]) {
      expect(screen.getByText(msg)).toBeInTheDocument()
    }
  })

  it('rechaza CV que no sea PDF o Word', async () => {
    const user = userEvent.setup()
    render(<CareersForm />)
    fireEvent.change(label(t.cv), { target: { files: [new File(['x'], 'foto.png', { type: 'image/png' })] } })
    await user.click(screen.getByRole('button', { name: t.submit }))
    expect(screen.getByText(t.errors.cvType)).toBeInTheDocument()
  })

  it('rechaza CV de más de 5 MB', async () => {
    const user = userEvent.setup()
    render(<CareersForm />)
    await user.upload(label(t.cv), pdf(5 * 1024 * 1024 + 1))
    await user.click(screen.getByRole('button', { name: t.submit }))
    expect(screen.getByText(t.errors.cvSize)).toBeInTheDocument()
  })

  it('avisa que no está configurado si falta la URL de Zoho', async () => {
    vi.stubEnv('VITE_ZOHO_CAREERS_URL', '')
    const user = userEvent.setup()
    render(<CareersForm />)
    await fillValid(user)
    await user.click(screen.getByRole('button', { name: t.submit }))
    expect(screen.getByRole('alert')).toHaveTextContent(t.notConfigured)
  })

  it('envía a Zoho como multipart con los nombres de campo de Zoho', () => {
    const url = 'https://forms.zohopublic.com/org/form/Postulaciones/formperma/abc/htmlRecords/submit'
    vi.stubEnv('VITE_ZOHO_CAREERS_URL', url)
    const { container } = render(<CareersForm />)
    const form = container.querySelector('form')
    expect(form).toHaveAttribute('action', url)
    expect(form).toHaveAttribute('enctype', 'multipart/form-data')
    Object.values(ZOHO_FIELDS).forEach((name) => {
      expect(form.elements[name]).toBeTruthy()
    })
  })

  it('precarga el puesto elegido', () => {
    render(<CareersForm position="Analista SOC" />)
    expect(label(t.position)).toHaveValue('Analista SOC')
  })

  it('muestra la confirmación al volver de Zoho', () => {
    render(<CareersForm sent />)
    expect(screen.getByRole('status')).toHaveTextContent(t.success)
  })
})
