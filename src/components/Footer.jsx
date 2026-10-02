import { Link } from 'react-router-dom'
import { useContent } from '../i18n.jsx'

export default function Footer() {
  const { site, nav, services, footer } = useContent()
  return (
    <footer className="bg-brand-950 text-slate-300">
      <div className="container-site grid grid-cols-2 gap-8 py-10 sm:gap-10 sm:py-14 lg:grid-cols-4">
        <div className="col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2.5">
            <img src="/assets/logo-sm.webp" alt="" width="36" height="36" className="h-9 w-9 rounded-md object-contain" />
            <span className="text-lg font-bold text-white">
              {site.brandText}<span className="text-accent-400">.</span>
            </span>
          </div>
          <p className="mt-3 hidden text-sm leading-relaxed text-slate-400 sm:block">{site.tagline}</p>
        </div>

        <nav aria-label={footer.links}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">{footer.links}</h3>
          <ul className="mt-3 space-y-1.5 text-sm">
            {nav.items.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-slate-400 transition hover:text-accent-400">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/trabaja-con-nosotros" className="text-slate-400 transition hover:text-accent-400">
                {footer.careers}
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label={footer.services}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">{footer.services}</h3>
          <ul className="mt-3 space-y-1.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/servicios#${s.slug}`} className="text-slate-400 transition hover:text-accent-400">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-2 lg:col-span-1">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">{footer.contact}</h3>
          <ul className="mt-3 space-y-1.5 text-sm text-slate-400">
            <li>{site.address}</li>
            <li>
              <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`} className="transition hover:text-accent-400">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="transition hover:text-accent-400">
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition hover:text-accent-400"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
                </svg>
                {footer.social}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-1 py-4 text-center text-xs text-slate-500 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {site.name}. {footer.rights}
          </p>
          <Link to="/privacidad" className="transition hover:text-accent-400">
            {footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  )
}
