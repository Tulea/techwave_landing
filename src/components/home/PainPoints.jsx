import { useContent } from '../../i18n.jsx'
import SectionHeading from '../SectionHeading.jsx'

export default function PainPoints() {
  const { painPoints } = useContent()
  return (
    <section className="section bg-brand-50/60">
      <div className="container-site">
        <SectionHeading eyebrow={painPoints.eyebrow} title={painPoints.title} intro={painPoints.intro} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {painPoints.cards.map((card) => (
            <article key={card.title} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-3xl font-bold text-brand-800">{card.stat}</p>
              <h3 className="mt-3 text-sm font-semibold leading-snug text-brand-900">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{card.body}</p>
              <p className="mt-auto pt-4 text-xs text-slate-400">
                {painPoints.sourceLabel}:{' '}
                <a href={card.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-800">
                  {card.source}
                </a>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
