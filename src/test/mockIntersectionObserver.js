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
