// jsdom no implementa IntersectionObserver: stub reutilizable para los
// componentes que lo usan (Counters). Aplíquelo en beforeAll con
// mockIntersectionObserver() y restaure en afterAll con vi.unstubAllGlobals().
class MockObserver {
  constructor(cb) {
    this.cb = cb
  }
  observe(el) {
    this.cb([{ isIntersecting: true }])
  }
  disconnect() {}
}

export function mockIntersectionObserver() {
  vi.stubGlobal('IntersectionObserver', MockObserver)
}
