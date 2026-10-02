import { useContent } from '../../i18n.jsx'
import SectionHeading from '../SectionHeading.jsx'

export default function Cases() {
  const { cases } = useContent()
  if (!cases.items.length) return null

  const rows = [
    ['challenge', cases.challengeLabel],
    ['solution', cases.solutionLabel],
    ['result', cases.resultLabel],
  ]

  return (
    <section className="section">
      <div className="container-site">
        <SectionHeading eyebrow={cases.eyebrow} title={cases.title} />
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
          {cases.items.map((c) => (
            <article key={c.client} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent-600">{c.industry}</p>
              <h3 className="mt-2 text-2xl font-bold text-brand-900">{c.client}</h3>
              <dl className="mt-6 space-y-4">
                {rows.map(([key, label]) => (
                  <div key={key} className="border-l-2 border-brand-200 pl-4">
                    <dt className="text-sm font-semibold text-brand-800">{label}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-slate-600">{c[key]}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
