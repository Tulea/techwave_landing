import { Link } from 'react-router-dom'
import { hero } from '../../data/content.js'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
      <div className="container-site grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
        <div>
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-brand-900 sm:text-5xl">
            {hero.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">{hero.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to={hero.primaryCta.to} className="btn-primary">
              {hero.primaryCta.label}
            </Link>
            <Link to={hero.secondaryCta.to} className="btn-secondary">
              {hero.secondaryCta.label}
            </Link>
          </div>
          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-slate-200 pt-8">
            {hero.stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dt className="order-2 mt-1 text-xs text-slate-500">{s.label}</dt>
                <dd className="order-1 text-3xl font-bold text-brand-800">
                  {s.value}
                  {s.suffix}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-accent-500/20 to-brand-500/20 blur-2xl" aria-hidden="true" />
          <img
            src="/assets/hero-image.png"
            alt={hero.imageAlt}
            className="relative w-full rounded-3xl border border-brand-100 object-cover shadow-xl"
            width="512"
            height="512"
          />
        </div>
      </div>
    </section>
  )
}
