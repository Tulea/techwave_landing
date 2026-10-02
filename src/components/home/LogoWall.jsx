import { useContent } from '../../i18n.jsx'
import SectionHeading from '../SectionHeading.jsx'

export default function LogoWall() {
  const { allies } = useContent()
  return (
    <section className="section">
      <div className="container-site">
        <SectionHeading eyebrow={allies.eyebrow} title={allies.title} />
        <div className="mt-10 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
          {allies.items.map((item) => (
            <div
              key={item.name}
              className="flex h-20 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 shadow-sm [&:last-child:nth-child(odd)]:col-span-2 sm:h-auto sm:px-8 sm:py-5"
            >
              {item.logo ? (
                <img
                  src={item.logo}
                  alt={item.name}
                  className="max-h-9 w-auto max-w-full object-contain sm:h-12 sm:max-h-none"
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
