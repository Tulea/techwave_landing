import { painPoints } from '../../data/content.js'
import SectionHeading from '../SectionHeading.jsx'

export default function PainPoints() {
  return (
    <section className="section bg-brand-50/60">
      <div className="container-site">
        <SectionHeading eyebrow={painPoints.eyebrow} title={painPoints.title} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {painPoints.cards.map((card) => (
            <article key={card.title} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-3xl font-bold text-brand-800">{card.stat}</p>
              <h3 className="mt-3 text-sm font-semibold leading-snug text-brand-900">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
