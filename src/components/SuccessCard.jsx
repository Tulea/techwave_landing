const icons = {
  mail: ['M20.25 12.75V6.75A2.25 2.25 0 0 0 18 4.5H4.5a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5h8.25', 'm2.625 6.75 8.625 5.625 8.625-5.625', 'm15 18 2.25 2.25 4.5-4.5'],
  doubleCheck: ['m1.5 12.75 4.5 4.5 9-9', 'm9.75 15.75 1.5 1.5 9-9'],
}

export default function SuccessCard({ icon, message }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm" role="status">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-400/15 text-accent-600">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8" aria-hidden="true">
          {icons[icon].map((d) => (
            <path key={d} strokeLinecap="round" strokeLinejoin="round" d={d} />
          ))}
        </svg>
      </span>
      <h3 className="mt-5 text-2xl font-bold text-brand-900">{message.title}</h3>
      <p className="mt-3 font-semibold text-slate-700">{message.subtitle}</p>
      <p className="mt-3 leading-relaxed text-slate-600">{message.body}</p>
      <hr className="my-6 border-slate-200" />
      <p className="text-sm text-slate-500">{message.tagline}</p>
    </div>
  )
}
