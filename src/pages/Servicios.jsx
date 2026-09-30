import { Link } from 'react-router-dom'
import { services, servicesPage, proteja } from '../data/content.js'
import SectionHeading from '../components/SectionHeading.jsx'

export default function Servicios() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white py-16 sm:py-20">
        <div className="container-site">
          <SectionHeading
            eyebrow={servicesPage.eyebrow}
            title={servicesPage.title}
            intro={servicesPage.intro}
            align="left"
            as="h1"
          />
        </div>
      </section>

      <section className="section pt-8">
        <div className="container-site space-y-16">
          {services.map((s, i) => (
            <article
              key={s.slug}
              id={s.slug}
              className="grid items-center gap-10 lg:grid-cols-2"
            >
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <p className="eyebrow">{`0${i + 1}`}</p>
                <h2 className="mt-3 text-3xl font-bold text-brand-900">{s.name}</h2>
                <p className="mt-4 text-lg leading-relaxed text-slate-600">{s.summary}</p>
                <ul className="mt-6 space-y-3">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-slate-700">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to={servicesPage.cta.to} className="btn-primary mt-8">
                  {servicesPage.cta.label}
                </Link>
              </div>
              <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl border border-brand-100 bg-brand-50 p-8 shadow-sm">
                <img
                  src={s.image}
                  alt={s.name}
                  className="max-h-full max-w-full rounded-xl object-contain"
                  loading="lazy"
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section bg-brand-900">
        <div className="container-site">
          <SectionHeading eyebrow={proteja.eyebrow} title={proteja.title} intro={proteja.intro} dark />
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {proteja.solutions.map((sol) => (
              <article key={sol.name} className="rounded-2xl border border-white/10 bg-brand-800/60 p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">{sol.tag}</p>
                <h3 className="mt-2 text-2xl font-bold text-white">{sol.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-200">{sol.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to={proteja.cta.to} className="btn-primary bg-accent-500 hover:bg-accent-600">
              {proteja.cta.label}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
