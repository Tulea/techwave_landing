import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useContent, useLanguage } from '../i18n.jsx'

function LanguageToggle() {
  const { language } = useContent()
  const { toggleLang } = useLanguage()
  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={language.switchAria}
      className="inline-flex h-10 items-center justify-center rounded-md border border-slate-200 px-3 text-sm font-semibold tracking-wide text-brand-800 transition hover:bg-brand-50"
    >
      {language.switchToShort}
    </button>
  )
}

export default function Navbar() {
  const { nav, site } = useContent()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="container-site flex h-20 items-center justify-between" aria-label={nav.ariaLabel}>
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src="/assets/logo-sm.webp" alt="" width="56" height="56" className="h-12 w-12 rounded-md sm:h-14 sm:w-14 object-contain" />
          <span className="text-2xl font-bold tracking-tight text-brand-800 sm:text-3xl">
            {site.brandText}<span className="text-accent-500">.</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-10 lg:flex">
          {nav.items.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `text-lg font-medium transition ${
                    isActive ? 'font-semibold text-brand-800' : 'text-slate-600 hover:text-brand-800'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 lg:gap-3">
          <LanguageToggle />

          <Link to="/contacto" className="btn-primary hidden lg:inline-flex">
            {nav.cta}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-brand-800 hover:bg-brand-50 lg:hidden"
            aria-expanded={open}
            aria-label={open ? nav.menuClose : nav.menuOpen}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <ul className="container-site flex flex-col gap-1 py-3">
            {nav.items.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-md px-3 py-2.5 text-lg font-medium ${
                      isActive ? 'bg-brand-50 font-semibold text-brand-800' : 'text-slate-600 hover:bg-brand-50'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link to="/contacto" className="btn-primary mt-2 w-full" onClick={() => setOpen(false)}>
                {nav.cta}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
