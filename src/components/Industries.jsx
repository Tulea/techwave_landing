import { useContent } from '../i18n.jsx'
import SectionHeading from './SectionHeading.jsx'

export default function Industries() {
  const { industries } = useContent()
  return (
    <section id="industrias" className="section scroll-mt-24 bg-brand-50/60">
      <div className="container-site">
        <SectionHeading eyebrow={industries.eyebrow} title={industries.title} intro={industries.intro} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.items.map((ind) => (
            <article key={ind.slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-brand-900">{ind.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{ind.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
