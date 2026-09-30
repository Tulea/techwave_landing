import '@testing-library/jest-dom/vitest'

// jsdom no implementa window.scrollTo; ScrollToTop lo invoca en cada montaje.
window.scrollTo = () => {}
