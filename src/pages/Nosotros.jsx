import { about } from '../data/content.js'
import SectionHeading from '../components/SectionHeading.jsx'
import Counters from '../components/Counters.jsx'

export default function Nosotros() {
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
          />
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {about.certifications.items.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-center rounded-xl border border-slate-200 bg-white px-8 py-5 shadow-sm"
              >
                {item.logo ? (
                  <img
                    src={item.logo}
                    alt={item.name}
                    className="h-12 w-auto object-contain"
                  />
                ) : (
                  <span className="px-2 py-1 text-xl font-bold text-slate-400">{item.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Counters />
    </>
  )
}
