import { Link } from 'react-router-dom'
import { services, proteja } from '../data/content.js'
import SectionHeading from '../components/SectionHeading.jsx'

export default function Servicios() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white py-16 sm:py-20">
        <div className="container-site">
          <SectionHeading
            eyebrow="Nuestros servicios"
            title="Soluciones integrales para su operación"
            intro="Cuatro líneas de servicio que cubren su tecnología de punta a punta: desde la planeación hasta la protección."
            align="left"
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
                <Link to="/contacto" className="btn-primary mt-8">
                  Solicitar cotización
                </Link>
              </div>
              <div className="rounded-3xl bg-gradient-to-br from-brand-100 to-brand-50 p-1">
                <div className="flex aspect-[4/3] items-center justify-center rounded-[calc(1.5rem-4px)] bg-brand-50">
                  <img src="/assets/logo.png" alt="" className="h-24 w-24 rounded-xl object-contain opacity-80" />
                </div>
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
            <Link to="/contacto" className="btn-primary bg-accent-500 hover:bg-accent-600">
              Hablemos de su estrategia de respaldo
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
