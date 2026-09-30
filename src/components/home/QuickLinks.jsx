import { Link } from 'react-router-dom'
import { quickLinks } from '../../data/content.js'

export default function QuickLinks() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="container-site grid gap-px py-4 sm:grid-cols-3">
        {quickLinks.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className="flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
          >
            {item.label}
            <span aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
