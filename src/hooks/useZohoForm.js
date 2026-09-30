import { useState } from 'react'
import { contact } from '../data/content.js'

const getFormUrl = () => import.meta.env.VITE_ZOHO_FORM_URL ?? ''

export function useZohoForm() {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const submit = async (data) => {
    // Se lee en cada envío (no al importar el módulo): permite probar con
    // vi.stubEnv y que VITE_ZOHO_FORM_URL se tome del entorno en build.
    const formUrl = getFormUrl()
    if (!formUrl) {
      setStatus('error')
      setError(contact.notConfigured)
      return { ok: false }
    }
    setStatus('loading')
    setError('')
    try {
      const res = await fetch(formUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
        signal: AbortSignal.timeout(15000), // timeout de 15 s (spec §7)
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
      return { ok: true }
    } catch {
      setStatus('error')
      setError(contact.error)
      return { ok: false }
    }
  }

  return { status, error, submit }
}
