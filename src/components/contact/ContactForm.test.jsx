import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from './ContactForm.jsx'
import { contact } from '../../data/content.js'

describe('ContactForm', () => {
  it('muestra errores de validación al enviar vacío', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    await user.click(screen.getByRole('button', { name: 'Enviar' }))
    expect(screen.getByText('Ingrese su nombre')).toBeInTheDocument()
    expect(screen.getByText('Ingrese su apellido')).toBeInTheDocument()
    expect(screen.getByText('Ingrese su correo')).toBeInTheDocument()
    expect(screen.getByText('Escriba su mensaje')).toBeInTheDocument()
  })

  it('valida el formato del correo', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    await user.type(screen.getByLabelText(/Correo electrónico/), 'correo-invalido')
    await user.click(screen.getByRole('button', { name: 'Enviar' }))
    expect(screen.getByText('Ingrese un correo válido')).toBeInTheDocument()
  })

  it('muestra el mensaje de no configurado si falta la URL de Zoho', async () => {
    vi.stubEnv('VITE_ZOHO_FORM_URL', '')
    const user = userEvent.setup()
    render(<ContactForm />)
    await user.type(screen.getByLabelText(/Primer nombre/), 'Ana')
    await user.type(screen.getByLabelText(/Apellido/), 'Rojas')
    await user.type(screen.getByLabelText(/Correo electrónico/), 'ana@correo.com')
    await user.type(screen.getByLabelText(/Mensaje/), 'Hola, necesito una cotización')
    await user.click(screen.getByRole('button', { name: 'Enviar' }))
    expect(await screen.findByRole('alert')).toHaveTextContent(contact.notConfigured)
    vi.unstubAllEnvs()
  })
})
