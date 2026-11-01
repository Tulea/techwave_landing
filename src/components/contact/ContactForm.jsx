import { useState } from 'react'
import { useContent, dictionaries } from '../../i18n.jsx'
import SuccessCard from '../SuccessCard.jsx'
import { ZOHO_CONSENT, phoneDigits, isValidPhone, redirectUrl } from '../../zoho.js'

export const ZOHO_FIELDS = {
  firstName: 'Name_First',
  lastName: 'Name_Last',
  email: 'Email',
  phone: 'PhoneNumber_countrycode',
  service: 'Dropdown',
  message: 'MultiLine',
  consent: 'Checkbox',
}

const getActionUrl = () => import.meta.env.VITE_ZOHO_FORM_URL ?? ''

const initialValues = { firstName: '', lastName: '', email: '', phone: '', service: '', message: '', consent: false }

const serviceValues = dictionaries.es.contact.services

function serviceFromUrl() {
  const slug = new URLSearchParams(window.location.search).get('servicio')
  return dictionaries.es.services.find((s) => s.slug === slug)?.name ?? ''
}

function validate(values, contact) {
  const errors = {}
  if (!values.firstName.trim()) errors.firstName = contact.form.errors.firstName
  if (!values.lastName.trim()) errors.lastName = contact.form.errors.lastName
  if (!values.email.trim()) {
    errors.email = contact.form.errors.emailRequired
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = contact.form.errors.emailInvalid
  }
  if (!isValidPhone(values.phone)) errors.phone = contact.form.errors.phone
  if (!values.service) errors.service = contact.form.errors.service
  if (!values.message.trim()) errors.message = contact.form.errors.message
  if (!values.consent) errors.consent = contact.form.consent.error
  return errors
}

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200'

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

export default function ContactForm({ sent = false }) {
  const { contact } = useContent()
  const [values, setValues] = useState(() => ({ ...initialValues, service: serviceFromUrl() }))
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [notConfigured, setNotConfigured] = useState(false)
  const actionUrl = getActionUrl()

  if (sent) {
    return <SuccessCard icon="mail" message={contact.success} />
  }

  const onChange = (e) => {
    const { id, value, type, checked } = e.target
    setValues((v) => ({ ...v, [id]: type === 'checkbox' ? checked : value }))
    setErrors((err) => ({ ...err, [id]: undefined }))
  }

  const onSubmit = (e) => {
    const found = validate(values, contact)
    setErrors(found)
    if (Object.keys(found).length) {
      e.preventDefault()
      return
    }
    if (!actionUrl) {
      e.preventDefault()
      setNotConfigured(true)
      return
    }
    setSending(true)
  }

  const a11y = (name) => ({
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })

  return (
    <form
      action={actionUrl || undefined}
      method="POST"
      encType="multipart/form-data"
      acceptCharset="UTF-8"
      onSubmit={onSubmit}
      noValidate
      className="space-y-5"
    >
      <input type="hidden" name="zf_referrer_name" value="" />
      <input type="hidden" name="zf_redirect_url" value={redirectUrl()} />
      <input type="hidden" name="zc_gad" value="" />
      <input type="hidden" name={ZOHO_FIELDS.phone} value={phoneDigits(values.phone)} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="firstName" label={contact.form.firstName.label} required={contact.form.firstName.required} errors={errors}>
          <input
            id="firstName"
            name={ZOHO_FIELDS.firstName}
            type="text"
            autoComplete="given-name"
            className={inputClass}
            value={values.firstName}
            onChange={onChange}
            {...a11y('firstName')}
          />
        </Field>
        <Field name="lastName" label={contact.form.lastName.label} required={contact.form.lastName.required} errors={errors}>
          <input
            id="lastName"
            name={ZOHO_FIELDS.lastName}
            type="text"
            autoComplete="family-name"
            className={inputClass}
            value={values.lastName}
            onChange={onChange}
            {...a11y('lastName')}
          />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="email" label={contact.form.email.label} required={contact.form.email.required} errors={errors}>
          <input
            id="email"
            name={ZOHO_FIELDS.email}
            type="email"
            autoComplete="email"
            className={inputClass}
            value={values.email}
            onChange={onChange}
            {...a11y('email')}
          />
        </Field>
        <Field name="phone" label={contact.form.phone.label} required={contact.form.phone.required} errors={errors}>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            value={values.phone}
            onChange={onChange}
            {...a11y('phone')}
          />
        </Field>
      </div>
      <Field name="service" label={contact.form.service.label} required={contact.form.service.required} errors={errors}>
        <select
          id="service"
          name={ZOHO_FIELDS.service}
          className={inputClass}
          value={values.service}
          onChange={onChange}
          {...a11y('service')}
        >
          <option value="">{contact.form.service.placeholder}</option>
          {contact.services.map((s, i) => (
            <option key={serviceValues[i]} value={serviceValues[i]}>
              {s}
            </option>
          ))}
        </select>
      </Field>
      <Field name="message" label={contact.form.message.label} required={contact.form.message.required} errors={errors}>
        <textarea
          id="message"
          name={ZOHO_FIELDS.message}
          rows="5"
          className={inputClass}
          value={values.message}
          onChange={onChange}
          {...a11y('message')}
        />
      </Field>

      <div>
        <label className="flex items-start gap-3 text-sm text-slate-700">
          <input
            id="consent"
            name={ZOHO_FIELDS.consent}
            value={ZOHO_CONSENT}
            type="checkbox"
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-brand-800"
            checked={values.consent}
            onChange={onChange}
            {...a11y('consent')}
          />
          <span>
            {contact.form.consent.labelBefore}
            <a href="/privacidad" target="_blank" rel="noopener" className="font-medium text-brand-800 underline hover:text-accent-600">
              {contact.form.consent.linkLabel}
            </a>
            {contact.form.consent.labelAfter}
            <span className="text-red-500"> *</span>
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="mt-1 text-xs text-red-600">
            {errors.consent}
          </p>
        )}
      </div>

      {notConfigured && (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {contact.notConfigured}
        </p>
      )}

      <button type="submit" disabled={sending} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
        {sending ? contact.form.submitting : contact.form.submit}
      </button>
    </form>
  )
}
