import { useContent } from '../i18n.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import SectionHeading from '../components/SectionHeading.jsx'
import Counters from '../components/Counters.jsx'

export default function Nosotros() {
  const { about, allies } = useContent()
  usePageMeta('nosotros')
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white py-16 sm:py-20">
        <div className="container-site">
          <SectionHeading eyebrow={about.eyebrow} title={about.title} align="left" as="h1" />
        </div>
      </section>

      <section className="section pt-8">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div className="space-y-5 text-lg leading-relaxed text-slate-600">
            {about.story.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
          <div className="grid content-start gap-6">
            <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-lg font-bold text-brand-800">{about.missionTitle}</h2>
              <p className="mt-3 leading-relaxed text-slate-600">{about.mission}</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-lg font-bold text-brand-800">{about.visionTitle}</h2>
              <p className="mt-3 leading-relaxed text-slate-600">{about.vision}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section bg-brand-50/60">
        <div className="container-site">
          <SectionHeading eyebrow={about.valuesSection.eyebrow} title={about.valuesSection.title} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((v) => (
              <article key={v.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-brand-900">{v.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-site">
          <SectionHeading
            eyebrow={about.certifications.eyebrow}
            title={about.certifications.title}
            intro={about.certifications.intro}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allies.items.map((item) => (
              <article key={item.name} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-16 items-center">
                  {item.logo ? (
                    <img src={item.logo} alt={item.name} className="h-12 w-auto max-w-[10rem] object-contain" />
                  ) : (
                    <span className="text-xl font-bold text-slate-400">{item.name}</span>
                  )}
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-accent-600">{item.tag}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Counters />
    </>
  )
}
