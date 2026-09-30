import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from './ContactForm.jsx'
import { contact } from '../../data/content.js'

describe('ContactForm', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('muestra errores de validación al enviar vacío', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    await user.click(screen.getByRole('button', { name: contact.form.submit }))
    expect(screen.getByText(contact.form.errors.firstName)).toBeInTheDocument()
    expect(screen.getByText(contact.form.errors.lastName)).toBeInTheDocument()
    expect(screen.getByText(contact.form.errors.emailRequired)).toBeInTheDocument()
    expect(screen.getByText(contact.form.errors.message)).toBeInTheDocument()
  })

  it('valida el formato del correo', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    await user.type(screen.getByLabelText(contact.form.email.label, { exact: false }), 'correo-invalido')
    await user.click(screen.getByRole('button', { name: contact.form.submit }))
    expect(screen.getByText(contact.form.errors.emailInvalid)).toBeInTheDocument()
  })

  it('muestra el mensaje de no configurado si falta la URL de Zoho', async () => {
    vi.stubEnv('VITE_ZOHO_FORM_URL', '')
    const user = userEvent.setup()
    render(<ContactForm />)
    await user.type(screen.getByLabelText(contact.form.firstName.label, { exact: false }), 'Ana')
    await user.type(screen.getByLabelText(contact.form.lastName.label, { exact: false }), 'Rojas')
    await user.type(screen.getByLabelText(contact.form.email.label, { exact: false }), 'ana@correo.com')
    await user.type(screen.getByLabelText(contact.form.message.label, { exact: false }), 'Hola, necesito una cotización')
    await user.click(screen.getByRole('button', { name: contact.form.submit }))
    expect(await screen.findByRole('alert')).toHaveTextContent(contact.notConfigured)
  })
})
