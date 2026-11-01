export const ZOHO_CONSENT = 'Acepto la política de privacidad y autorizo a TechWave a contactarme'

export const phoneDigits = (value) => value.replace(/\D/g, '')

export const isValidPhone = (value) => [8, 11].includes(phoneDigits(value).length)

export const redirectUrl = () => `${window.location.origin}${window.location.pathname}?enviado=1`
