import { allies } from '../../data/content.js'
import SectionHeading from '../SectionHeading.jsx'

export default function LogoWall() {
  return (
    <section className="section">
      <div className="container-site">
        <SectionHeading eyebrow={allies.eyebrow} title={allies.title} />
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {allies.items.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-center rounded-xl border border-slate-200 bg-white px-8 py-5 shadow-sm"
            >
              {item.logo ? (
                <img
                  src={item.logo}
                  alt={item.name}
                  className="h-12 w-auto object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
                />
              ) : (
                <span className="px-2 py-1 text-xl font-bold text-slate-400">{item.name}</span>
              )}
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-slate-500">{allies.note}</p>
      </div>
    </section>
  )
}
