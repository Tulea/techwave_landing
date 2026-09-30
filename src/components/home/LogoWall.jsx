import { allies } from '../../data/content.js'
import SectionHeading from '../SectionHeading.jsx'

export default function LogoWall() {
  return (
    <section className="section">
      <div className="container-site">
        <SectionHeading eyebrow={allies.eyebrow} title={allies.title} />
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {allies.items.map((item) => (
            <span
              key={item}
              className="rounded-xl border border-slate-200 bg-white px-10 py-6 text-xl font-bold text-slate-400 shadow-sm"
            >
              {item}
            </span>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-slate-500">{allies.note}</p>
      </div>
    </section>
  )
}
