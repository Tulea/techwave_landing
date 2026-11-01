export const ZOHO_CONSENT = 'Acepto la política de privacidad y autorizo a TechWave a contactarme'

export const phoneDigits = (value) => value.replace(/\D/g, '')

export const isValidPhone = (value) => phoneDigits(value).length >= 8

export const redirectUrl = () => `${window.location.origin}${window.location.pathname}?enviado=1`
