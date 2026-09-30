import { Link } from 'react-router-dom'
import { proteja } from '../../data/content.js'
import SectionHeading from '../SectionHeading.jsx'

export default function ProtejaSusDatos() {
  return (
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
  )
}
