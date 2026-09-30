import { renderHook, act, waitFor } from '@testing-library/react'
import { useZohoForm } from './useZohoForm.js'
import { contact } from '../data/content.js'

describe('useZohoForm', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('falla con mensaje claro si no hay URL configurada', async () => {
    vi.stubEnv('VITE_ZOHO_FORM_URL', '')
    const { result } = renderHook(() => useZohoForm())
    let res
    await act(async () => {
      res = await result.current.submit({ nombre: 'Ana' })
    })
    expect(res.ok).toBe(false)
    expect(result.current.status).toBe('error')
    expect(result.current.error).toBe(contact.notConfigured)
  })

  it('envía correctamente con fetch y pasa a success', async () => {
    vi.stubEnv('VITE_ZOHO_FORM_URL', 'https://forms.zohopublic.com/org/form/Test/json/JSONString')
    const fetchMock = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetchMock)
    const { result } = renderHook(() => useZohoForm())
    let res
    await act(async () => {
      res = await result.current.submit({ nombre: 'Ana' })
    })
    expect(res.ok).toBe(true)
    expect(result.current.status).toBe('success')
    expect(fetchMock).toHaveBeenCalledWith(
      'https://forms.zohopublic.com/org/form/Test/json/JSONString',
      expect.objectContaining({ method: 'POST' }),
    )
  })

  it('falla con mensaje de error si el fetch rechaza', async () => {
    vi.stubEnv('VITE_ZOHO_FORM_URL', 'https://forms.zohopublic.com/org/form/Test/json/JSONString')
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network')))
    const { result } = renderHook(() => useZohoForm())
    let res
    await act(async () => {
      res = await result.current.submit({ nombre: 'Ana' })
    })
    expect(res.ok).toBe(false)
    expect(result.current.status).toBe('error')
    expect(result.current.error).toBe(contact.error)
  })
})
