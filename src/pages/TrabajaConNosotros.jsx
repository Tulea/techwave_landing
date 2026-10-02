import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useContent } from '../i18n.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import SectionHeading from '../components/SectionHeading.jsx'
import CareersForm from '../components/CareersForm.jsx'

export default function TrabajaConNosotros() {
  const { careers, services } = useContent()
  const [params] = useSearchParams()
  const [position, setPosition] = useState('')
  usePageMeta('trabaja')

  const apply = (title) => {
    setPosition(title)
    document.getElementById('postular')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white py-16 sm:py-20">
        <div className="container-site">
          <SectionHeading eyebrow={careers.eyebrow} title={careers.title} intro={careers.intro} align="left" as="h1" />
        </div>
      </section>

      <section className="section pt-8">
        <div className="container-site">
          <h2 className="text-2xl font-bold text-brand-900">{careers.areasTitle}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <article key={s.slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-brand-900">{s.name}</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                  {s.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-accent-500" aria-hidden="true">•</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <h2 className="mt-16 text-2xl font-bold text-brand-900">{careers.openingsTitle}</h2>
          {careers.openings.length ? (
            <div className="mt-6 space-y-4">
              {careers.openings.map((job) => (
                <article
                  key={job.title}
                  className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="text-lg font-bold text-brand-900">{job.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">{[job.area, job.mode, job.location].filter(Boolean).join(' · ')}</p>
                    {job.description && <p className="mt-3 text-sm leading-relaxed text-slate-600">{job.description}</p>}
                  </div>
                  <button type="button" onClick={() => apply(job.title)} className="btn-primary shrink-0">
                    {careers.applyLabel}
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-4 max-w-3xl leading-relaxed text-slate-600">{careers.noOpenings}</p>
          )}
        </div>
      </section>

      <section id="postular" className="section scroll-mt-24 bg-brand-50/60">
        <div className="container-site max-w-3xl">
          <SectionHeading title={careers.form.title} intro={careers.form.intro} />
          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
            <CareersForm position={position} sent={params.get('enviado') === '1'} />
          </div>
          <p className="mt-6 text-center text-sm text-slate-500">{careers.email}</p>
        </div>
      </section>
    </>
  )
}
