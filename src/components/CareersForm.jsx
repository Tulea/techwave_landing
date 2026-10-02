import { useState } from 'react'
import { useContent } from '../i18n.jsx'

const MAX_CV_BYTES = 5 * 1024 * 1024
const CV_TYPES = /\.(pdf|doc|docx)$/i

export const ZOHO_FIELDS = {
  firstName: 'Name_First',
  lastName: 'Name_Last',
  email: 'Email',
  phone: 'PhoneNumber_countrycode',
  position: 'SingleLine',
  message: 'MultiLine',
  cv: 'FileUpload',
}

const getActionUrl = () => import.meta.env.VITE_ZOHO_CAREERS_URL ?? ''

function validate(form, t) {
  const errors = {}
  const value = (name) => form.elements[ZOHO_FIELDS[name]].value.trim()
  if (!value('firstName')) errors.firstName = t.errors.firstName
  if (!value('lastName')) errors.lastName = t.errors.lastName
  if (!value('email')) errors.email = t.errors.emailRequired
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value('email'))) errors.email = t.errors.emailInvalid
  if (!value('position')) errors.position = t.errors.position
  const file = form.elements[ZOHO_FIELDS.cv].files[0]
  if (!file) errors.cv = t.errors.cvRequired
  else if (!CV_TYPES.test(file.name)) errors.cv = t.errors.cvType
  else if (file.size > MAX_CV_BYTES) errors.cv = t.errors.cvSize
  if (!form.elements.consent.checked) errors.consent = t.consentError
  return errors
}

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200'

function Field({ id, label, required, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

export default function CareersForm({ position = '', sent = false }) {
  const { careers, contact } = useContent()
  const t = { ...careers.form, consentError: contact.form.consent.error }
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [notConfigured, setNotConfigured] = useState(false)
  const actionUrl = getActionUrl()

  if (sent) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center" role="status">
        <p className="text-lg font-semibold text-green-800">{t.success}</p>
      </div>
    )
  }

  const onSubmit = (e) => {
    const found = validate(e.currentTarget, t)
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

  const clear = (name) => () => setErrors((err) => ({ ...err, [name]: undefined }))
  const a11y = (name) => ({
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    onChange: clear(name),
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
      <input type="hidden" name="zf_redirect_url" value="" />
      <input type="hidden" name="zc_gad" value="" />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="firstName" label={t.firstName} required error={errors.firstName}>
          <input id="firstName" name={ZOHO_FIELDS.firstName} type="text" autoComplete="given-name" className={inputClass} {...a11y('firstName')} />
        </Field>
        <Field id="lastName" label={t.lastName} required error={errors.lastName}>
          <input id="lastName" name={ZOHO_FIELDS.lastName} type="text" autoComplete="family-name" className={inputClass} {...a11y('lastName')} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="email" label={t.email} required error={errors.email}>
          <input id="email" name={ZOHO_FIELDS.email} type="email" autoComplete="email" className={inputClass} {...a11y('email')} />
        </Field>
        <Field id="phone" label={t.phone}>
          <input id="phone" name={ZOHO_FIELDS.phone} type="tel" autoComplete="tel" className={inputClass} />
        </Field>
      </div>
      <Field id="position" label={t.position} required error={errors.position}>
        <input
          key={position}
          id="position"
          name={ZOHO_FIELDS.position}
          type="text"
          defaultValue={position}
          placeholder={t.positionPlaceholder}
          className={inputClass}
          {...a11y('position')}
        />
      </Field>
      <Field id="message" label={t.message}>
        <textarea id="message" name={ZOHO_FIELDS.message} rows="4" className={inputClass} />
      </Field>
      <Field id="cv" label={t.cv} required error={errors.cv}>
        <input
          id="cv"
          name={ZOHO_FIELDS.cv}
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-50 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-brand-800 hover:file:bg-brand-100"
          {...a11y('cv')}
        />
      </Field>

      <div>
        <label className="flex items-start gap-3 text-sm text-slate-700">
          <input
            id="consent"
            type="checkbox"
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-brand-800"
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
          {t.notConfigured}
        </p>
      )}

      <button type="submit" disabled={sending} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
        {sending ? t.submitting : t.submit}
      </button>
    </form>
  )
}
