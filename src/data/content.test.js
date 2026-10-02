import { site, nav, hero, services, painPoints, counters, contact } from './content.js'
import contenido from './contenido.json'
import * as content from './content.js'

describe('content', () => {
  it('tiene datos de contacto completos', () => {
    expect(site.phone).toMatch(/^\+506/)
    expect(site.email).toContain('@')
  })

  it('tiene exactamente 4 servicios', () => {
    expect(services).toHaveLength(4)
    expect(services.map((s) => s.slug).sort()).toEqual([
      'ciberseguridad',
      'consultoria',
      'infraestructura',
      'tecnologia',
    ])
  })

  it('cada servicio tiene nombre, resumen y 3 beneficios', () => {
    services.forEach((s) => {
      expect(s.name).toBeTruthy()
      expect(s.summary).toBeTruthy()
      expect(s.features).toHaveLength(3)
    })
  })

  it('no menciona servicios fuera de la oferta', () => {
    const everything = JSON.stringify(contenido)
    expect(everything.toLowerCase()).not.toMatch(/desarrollo de software|gesti[oó]n de datos|soluciones en la nube/)
  })

  it('la navegación apunta a las 4 rutas', () => {
    expect(nav.items.map((n) => n.to)).toEqual(['/', '/nosotros', '/servicios', '/contacto'])
  })
})

it('contenido.json y content.js exponen exactamente las mismas claves de contenido', () => {
  const jsonKeys = Object.keys(contenido)
  expect(jsonKeys.sort()).toEqual(Object.keys(content).sort())
})
