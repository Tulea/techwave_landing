export default function SectionHeading({ eyebrow, title, intro, align = 'center', dark = false, as: Tag = 'h2' }) {
  const alignClass = align === 'center' ? 'mx-auto text-center' : 'text-left'
  return (
    <div className={`max-w-3xl ${alignClass}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag className={`mt-3 text-3xl font-bold tracking-tight sm:text-4xl ${dark ? 'text-white' : 'text-brand-900'}`}>
        {title}
      </Tag>
      {intro && <p className={`mt-4 text-lg leading-relaxed ${dark ? 'text-brand-200' : 'text-slate-600'}`}>{intro}</p>}
    </div>
  )
}
