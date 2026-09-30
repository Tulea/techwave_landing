import { useState } from 'react'
import { useZohoForm } from '../../hooks/useZohoForm.js'
import { contact } from '../../data/content.js'

const initialValues = { firstName: '', lastName: '', email: '', phone: '', service: '', message: '' }

function validate(values) {
  const errors = {}
  if (!values.firstName.trim()) errors.firstName = 'Ingrese su nombre'
  if (!values.lastName.trim()) errors.lastName = 'Ingrese su apellido'
  if (!values.email.trim()) {
    errors.email = 'Ingrese su correo'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Ingrese un correo válido'
  }
  if (!values.message.trim()) errors.message = 'Escriba su mensaje'
  return errors
}

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200'

// Definida fuera del componente: definirla dentro haría que los inputs
// pierdan el foco en cada tecla (React remonta el componente Field).
function Field({ name, label, required, errors, children }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {children}
      {errors[name] && (
        <p id={`${name}-error`} className="mt-1 text-xs text-red-600">
          {errors[name]}
        </p>
      )}
    </div>
  )
}

export default function ContactForm() {
  const { status, error, submit } = useZohoForm()
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    setErrors((err) => ({ ...err, [name]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const v = validate(values)
    setErrors(v)
    if (Object.keys(v).length > 0) return

    const payload = {
      'Primer Nombre': values.firstName.trim(),
      Apellido: values.lastName.trim(),
      Email: values.email.trim(),
      Teléfono: values.phone.trim(),
      Servicio: values.service,
      Mensaje: values.message.trim(),
    }
    await submit(payload)
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center" role="status">
        <p className="text-lg font-semibold text-green-800">{contact.success}</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="firstName" label={contact.form.firstName.label} required={contact.form.firstName.required} errors={errors}>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            className={inputClass}
            value={values.firstName}
            onChange={onChange}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? 'firstName-error' : undefined}
          />
        </Field>
        <Field name="lastName" label={contact.form.lastName.label} required={contact.form.lastName.required} errors={errors}>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            className={inputClass}
            value={values.lastName}
            onChange={onChange}
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={errors.lastName ? 'lastName-error' : undefined}
          />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="email" label={contact.form.email.label} required={contact.form.email.required} errors={errors}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={inputClass}
            value={values.email}
            onChange={onChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
        </Field>
        <Field name="phone" label={contact.form.phone.label} required={contact.form.phone.required} errors={errors}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            value={values.phone}
            onChange={onChange}
          />
        </Field>
      </div>
      <Field name="service" label={contact.form.service.label} required={contact.form.service.required} errors={errors}>
        <select id="service" name="service" className={inputClass} value={values.service} onChange={onChange}>
          <option value="">Seleccione una opción</option>
          {contact.services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </Field>
      <Field name="message" label={contact.form.message.label} required={contact.form.message.required} errors={errors}>
        <textarea
          id="message"
          name="message"
          rows="5"
          className={inputClass}
          value={values.message}
          onChange={onChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
      </Field>

      {status === 'error' && (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <button type="submit" disabled={status === 'loading'} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
        {status === 'loading' ? 'Enviando…' : 'Enviar'}
      </button>
    </form>
  )
}
