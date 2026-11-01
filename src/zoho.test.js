import { isValidPhone } from './zoho.js'

describe('isValidPhone', () => {
  it('acepta solo 8 u 11 dígitos', () => {
    expect(isValidPhone('8888-7777')).toBe(true)
    expect(isValidPhone('+506 8888-7777')).toBe(true)
    expect(isValidPhone('8888777')).toBe(false)
    expect(isValidPhone('888877776')).toBe(false)
    expect(isValidPhone('5068888777')).toBe(false)
    expect(isValidPhone('506888877771')).toBe(false)
    expect(isValidPhone('')).toBe(false)
  })
})
