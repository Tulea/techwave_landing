import { useState } from 'react'
import { contact as contactEs } from '../data/content.js'

const getFormUrl = () => import.meta.env.VITE_ZOHO_FORM_URL ?? ''

export function useZohoForm(messages = contactEs) {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const submit = async (data) => {
    const formUrl = getFormUrl()
    if (!formUrl) {
      setStatus('error')
      setError(messages.notConfigured)
      return { ok: false }
    }
    setStatus('loading')
    setError('')
    try {
      const res = await fetch(formUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
        signal: AbortSignal.timeout(15000),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
      return { ok: true }
    } catch {
      setStatus('error')
      setError(messages.error)
      return { ok: false }
    }
  }

  return { status, error, submit }
}
