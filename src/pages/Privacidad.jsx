import { useContent } from '../i18n.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import SectionHeading from '../components/SectionHeading.jsx'

export default function Privacidad() {
  const { privacy } = useContent()
  usePageMeta('privacidad')
  return (
    <section className="section">
      <div className="container-site max-w-3xl">
        <SectionHeading eyebrow={privacy.eyebrow} title={privacy.title} align="left" as="h1" />
        <p className="mt-3 text-sm text-slate-500">{privacy.updated}</p>
        <p className="mt-8 text-lg leading-relaxed text-slate-600">{privacy.intro}</p>
        <div className="mt-10 space-y-8">
          {privacy.sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-xl font-bold text-brand-900">{s.title}</h2>
              <p className="mt-2 leading-relaxed text-slate-600">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
