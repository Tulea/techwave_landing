import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm, { ZOHO_FIELDS } from './ContactForm.jsx'
import { ZOHO_CONSENT } from '../../zoho.js'
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
    expect(screen.getByText(contact.form.errors.phone)).toBeInTheDocument()
    expect(screen.getByText(contact.form.errors.service)).toBeInTheDocument()
    expect(screen.getByText(contact.form.errors.message)).toBeInTheDocument()
    expect(screen.getByText(contact.form.consent.error)).toBeInTheDocument()
  })

  it('preselecciona el servicio que viene en la URL', () => {
    window.history.pushState({}, '', '/contacto?servicio=ciberseguridad')
    render(<ContactForm />)
    expect(screen.getByLabelText(contact.form.service.label, { exact: false })).toHaveValue('Ciberseguridad')
    window.history.pushState({}, '', '/')
  })

  it('enlaza la política de privacidad en una pestaña nueva', () => {
    render(<ContactForm />)
    const link = screen.getByRole('link', { name: contact.form.consent.linkLabel })
    expect(link).toHaveAttribute('href', '/privacidad')
    expect(link).toHaveAttribute('target', '_blank')
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
    await user.type(screen.getByLabelText(contact.form.phone.label, { exact: false }), '+506 8888-7777')
    await user.selectOptions(screen.getByLabelText(contact.form.service.label, { exact: false }), 'Ciberseguridad')
    await user.type(screen.getByLabelText(contact.form.message.label, { exact: false }), 'Hola, necesito una cotización')
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: contact.form.submit }))
    expect(await screen.findByRole('alert')).toHaveTextContent(contact.notConfigured)
  })

  it('envía a Zoho con los nombres de campo, el teléfono solo en dígitos y la redirección', async () => {
    const url = 'https://forms.zohopublic.com/org/form/Contacto/formperma/abc/htmlRecords/submit'
    vi.stubEnv('VITE_ZOHO_FORM_URL', url)
    window.history.pushState({}, '', '/contacto')
    const user = userEvent.setup()
    const { container } = render(<ContactForm />)
    const form = container.querySelector('form')
    expect(form).toHaveAttribute('action', url)
    expect(form).toHaveAttribute('enctype', 'multipart/form-data')
    Object.values(ZOHO_FIELDS).forEach((name) => {
      expect(form.elements[name]).toBeTruthy()
    })
    await user.type(screen.getByLabelText(contact.form.phone.label, { exact: false }), '+506 8888-7777')
    expect(form.elements[ZOHO_FIELDS.phone].value).toBe('50688887777')
    expect(form.elements[ZOHO_FIELDS.consent].value).toBe(ZOHO_CONSENT)
    expect(form.elements.zf_redirect_url.value).toBe(`${window.location.origin}/contacto?enviado=1`)
    window.history.pushState({}, '', '/')
  })

  it('muestra la confirmación al volver de Zoho', () => {
    render(<ContactForm sent />)
    expect(screen.getByRole('status')).toHaveTextContent(contact.success)
  })
})
