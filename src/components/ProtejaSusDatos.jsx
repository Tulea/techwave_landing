import { Link } from 'react-router-dom'
import { useContent } from '../i18n.jsx'
import SectionHeading from './SectionHeading.jsx'

export default function ProtejaSusDatos() {
  const { proteja, allies } = useContent()
  return (
    <section className="section bg-brand-900">
      <div className="container-site">
        <SectionHeading eyebrow={proteja.eyebrow} title={proteja.title} intro={proteja.intro} dark />
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {allies.items.map((ally) => (
            <article
              key={ally.name}
              className="flex w-full flex-col rounded-2xl border border-white/10 bg-brand-800/60 p-6 sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              <div className="flex h-16 items-center justify-center rounded-xl bg-white px-4">
                <img src={ally.logo} alt={ally.name} className="h-9 w-auto max-w-[9rem] object-contain" loading="lazy" />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-accent-400">{ally.tag}</p>
              <h3 className="mt-1 text-xl font-bold text-white">{ally.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-200">{ally.body}</p>
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
