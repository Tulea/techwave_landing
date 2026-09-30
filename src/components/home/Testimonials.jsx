import { testimonials } from '../../data/content.js'
import SectionHeading from '../SectionHeading.jsx'

export default function Testimonials() {
  return (
    <section className="section bg-brand-50/60">
      <div className="container-site">
        <SectionHeading eyebrow={testimonials.eyebrow} title={testimonials.title} />
        <div className="mx-auto mt-12 grid max-w-3xl gap-6">
          {testimonials.items.map((t) => (
            <figure key={t.author} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <blockquote className="text-lg leading-relaxed text-slate-700">“{t.quote}”</blockquote>
              <figcaption className="mt-5 text-sm">
                <p className="font-semibold text-brand-900">{t.author}</p>
                <p className="text-slate-500">
                  {t.role} · {t.company}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
