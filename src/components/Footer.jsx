import { Link } from 'react-router-dom'
import { site, nav, services, footer } from '../data/content.js'

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-slate-300">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <img src="/assets/logo.png" alt="" className="h-9 w-9 rounded-md object-contain" />
            <span className="text-lg font-bold text-white">
              {site.brandText}<span className="text-accent-400">.</span>
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">{site.tagline}</p>
        </div>

        <nav aria-label={footer.links}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">{footer.links}</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.items.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-slate-400 transition hover:text-accent-400">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={footer.services}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">{footer.services}</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to="/servicios" className="text-slate-400 transition hover:text-accent-400">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">{footer.contact}</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
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
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="container-site py-5 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {site.name}. {footer.rights}
        </p>
      </div>
    </footer>
  )
}
